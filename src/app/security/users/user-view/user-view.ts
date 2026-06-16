import { Component, inject, OnInit } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService, Role, User } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { UserUpdate } from '@bernardo-mg/security';
import { MemberStatus, PublicMember } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { PanelModule } from 'primeng/panel';
import { finalize, Observable } from 'rxjs';
import { UserForm, UserFormData } from '../user-form/user-form';
import { UserInfo } from '../user-info/user-info';
import { UserList } from '../user-list/user-list';
import { UserMemberEditorForm } from '../user-member-editor-form/user-member-editor-form';
import { UserRolesEditor } from '../user-roles-editor/user-roles-editor';
import { UserService } from '../user-service';

@Component({
  selector: 'access-user-view',
  imports: [CardModule, ButtonModule, PanelModule, DrawerModule, UserForm, UserInfo, UserRolesEditor, UserMemberEditorForm, UserList],
  templateUrl: './user-view.html'
})
export class UserView implements OnInit {

  private readonly service = inject(UserService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  public readonly permissions: Permissions;
  public readonly Dialog = Dialog;

  public data = new Page<User>();

  public selectedData = new User();
  public member = new PublicMember();

  /**
   * Loading flag.
   */
  public loading = false;

  private sort = new Sorting();

  public failures = new FailureStore();

  public roleSelection: Role[] = [];

  public availableMembers: PublicMember[] = [];
  public members: PublicMember[] = [];

  public dialog = Dialog.NONE;

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission("user", "create"),
      edit: authService.hasPermission("user", "update"),
      delete: authService.hasPermission("user", "delete")
    };
  }

  public ngOnInit(): void {
    this.load();
  }

  // EVENT HANDLERS

  public onChangeDirection(sorting: SortingEvent) {
    // TODO: should receive the actual direction, not a number
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  public onInvite(toCreate: UserFormData): void {
    this.call(
      () => this.service.invite(toCreate),
      () => {
        this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 });
        this.load();
      }
    );
  }

  public onSetRoles(roles: Role[]): void {
    const user: UserUpdate = {
      ...this.selectedData,
      roles: [...roles.map(r => r.name)]
    }
    this.call(
      () => this.service.update(this.selectedData.username, user),
      () => {
        this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 });
        this.load();
      }
    );
  }

  public onUpdate(toUpdate: UserFormData): void {
    const user: UserUpdate = {
      ...toUpdate,
      enabled: this.selectedData.enabled,
      passwordNotExpired: this.selectedData.passwordNotExpired,
      roles: this.selectedData.roles.map(r => r.name)
    }
    this.call(
      () => this.service.update(this.selectedData.username, user),
      () => {
        this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 });
        this.load();
      }
    );
  }

  public onAssignMember(member: PublicMember): void {
    this.call(
      () => this.service.assignProfile(this.selectedData.username, member.number),
      () => {
        this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 });
        this.load();
      }
    );
  }

  public onShowUser(user: User) {
    this.selectedData = user;
    this.service.getProfile(user.username).subscribe(member => this.member = member);
    this.dialog = Dialog.INFO;
  }

  public onSetEnabled(status: boolean) {
    const userUpdate: UserUpdate = {
      ...this.selectedData,
      roles: this.selectedData.roles.map(r => r.name),
      enabled: status
    };
    this.call(
      () => this.service.update(this.selectedData.username, userUpdate),
      () => {
        this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 });
        this.load();
      }
    );
  }

  public onDelete(event: Event): void {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es revertible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Borrar',
        severity: 'danger'
      },
      accept: () =>
        this.call(
          () => this.service.delete(this.selectedData.username),
          () => {
            this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 });
            this.load();
          }
        )
    });
  }

  public onStartInvitation(): void {
    this.loading = true;
    this.service.getAllRoles()
      .pipe(finalize(() => this.loading = false))
      .subscribe(r => this.roleSelection = r);
    this.dialog = Dialog.INVITE;
  }

  public onStartEditing(user: User): void {
    this.selectedData = user;
    this.dialog = Dialog.EDIT;
  }

  public onStartEditingRoles(user: User): void {
    this.selectedData = user;
    this.loading = true;
    this.service.getAvailableRoles(user.username)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(r => this.roleSelection = r);
    this.dialog = Dialog.ROLES;
  }

  public onStartEditingMember(user: User): void {
    this.selectedData = user;
    this.service.getProfile(user.username).subscribe(member => this.member = member);
    this.service.getAvailableMembers(user.username).subscribe(members => this.availableMembers = members);
    this.dialog = Dialog.MEMBER;
  }

  public onSearchMembers(event: { query: string }) {
    this.service.searchMembers(event.query?.trim(), MemberStatus.Active)
      .subscribe(members => {
        this.members = members;
      });
  }

  // DATA LOADING

  public load(page: number | undefined = undefined) {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

  // DIALOGS

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.dialog = Dialog.NONE;
    }
  }

  // PRIVATE METHODS

  private call(
    action: () => Observable<any>,
    onSuccess: () => void
  ) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.dialog = Dialog.NONE;
          onSuccess();
        },
        error: error => this.handleError(error)
      });
  }

  private handleError(error: unknown): void {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
    }
  }

}

interface Permissions {
  create: boolean;
  edit: boolean;
  delete: boolean;
}

enum Dialog {
  NONE = 'none',
  INFO = 'info',
  EDIT = 'edit',
  INVITE = 'invite',
  ROLES = 'roles',
  MEMBER = 'member'
}