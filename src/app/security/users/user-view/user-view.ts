import { Component, inject, OnInit } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService, Role, User } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { UserUpdate } from '@bernardo-mg/security';
import { Member } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { finalize, Observable, throwError } from 'rxjs';
import { UserForm, UserFormData } from '../user-form/user-form';
import { UserInfo } from '../user-info/user-info';
import { UserList } from '../user-list/user-list';
import { UserMemberEditor } from '../user-member-editor/user-member-editor';
import { UserRolesEditor } from '../user-roles-editor/user-roles-editor';
import { UserRolesInfo } from '../user-roles-info/user-roles-info';
import { UserService } from '../user-service';

@Component({
  selector: 'access-user-view',
  imports: [CardModule, ButtonModule, PanelModule, DialogModule, UserForm, UserInfo, UserRolesEditor, UserMemberEditor, UserRolesInfo, UserList],
  templateUrl: './user-view.html'
})
export class UserView implements OnInit {

  private readonly service = inject(UserService);
  private readonly messageService = inject(MessageService);

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public data = new PaginatedResponse<User>();

  public selectedData = new User();
  public member = new Member();

  /**
   * Loading flag.
   */
  public loading = false;
  public editing = false;
  public showing = false;
  public showingRoles = false;

  public view: string = '';

  private sort = new Sorting();

  public failures = new FailureStore();

  public roleSelection: Role[] = [];

  public availableMembers: Member[] = [];

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.createable = authService.hasPermission("user", "create");
    this.editable = authService.hasPermission("user", "update");
    this.deletable = authService.hasPermission("user", "delete");
  }

  public ngOnInit(): void {
    this.load();
  }

  public onChangeDirection(sorting: SortingEvent) {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  public onShowRolesInfo(user: User) {
    this.selectedData = user;
    this.showingRoles = true;
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

  public onAssignMember(member: Member): void {
    this.call(
      () => this.service.assignProfile(this.selectedData.username, member.number),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onShowUser(user: User) {
    this.selectedData = user;
    this.service.getProfile(user.username).subscribe(member => this.member = member);
    this.showing = true;
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
    this.view = 'invite';
    this.editing = true;
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
        this.service.getAllRoles()
          .pipe(finalize(() => this.loading = false))
          .subscribe(r => this.roleSelection = r);
        break;
    }
    this.view = view;
    this.editing = true;
  }

  public load(page: number | undefined = undefined) {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

  private call(action: () => Observable<any>, onSuccess: () => void = () => { }) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.view = 'none';
          this.editing = false;
          this.showing = false;
          this.showingRoles = false;
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
