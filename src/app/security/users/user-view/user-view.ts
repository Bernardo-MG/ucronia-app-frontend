import { Component, inject, OnInit } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService, Role, User } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { UserUpdate } from '@bernardo-mg/security';
import { MemberStatus, PublicMember } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { PanelModule } from 'primeng/panel';
import { finalize, Observable, throwError } from 'rxjs';
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
      () => this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 })
    );
  }

  public onSetRoles(roles: Role[]): void {
    const user: UserUpdate = {
      ...this.selectedData,
      roles: [...roles.map(r => r.name)]
    }
    this.call(
      () => this.service.update(this.selectedData.username, user),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
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
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onAssignMember(member: PublicMember): void {
    this.call(
      () => this.service.assignProfile(this.selectedData.username, member.number),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
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
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onDelete(id: string) {
    this.call(
      () => this.service.delete(id),
      () => this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 })
    );
  }

  public onStartInvitation(): void {
    this.loading = true;
    this.service.getAllRoles()
      .pipe(finalize(() => this.loading = false))
      .subscribe(r => this.roleSelection = r);
    this.dialog = Dialog.INVITE;
  }

  public onStartEditing(user: User, view: string): void {
    this.selectedData = user;
    switch (view) {
      case 'member':
        this.service.getProfile(user.username).subscribe(member => this.member = member);
        this.service.getAvailableMembers(user.username).subscribe(members => this.availableMembers = members);
        break;
      case 'roles':
        this.loading = true;
        this.service.getAvailableRoles(user.username)
          .pipe(
            finalize(() => this.loading = false)
          )
          .subscribe(r => this.roleSelection = r);
        break;
    }
    this.dialog = Dialog.EDIT;
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

  private call(action: () => Observable<any>, onSuccess: () => void = () => { }) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.dialog = Dialog.NONE;
          this.load();
          onSuccess();
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
          return throwError(() => error);
        }
      });
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