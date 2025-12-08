import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { AuthContainer, Role, User } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { Menu, MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { finalize, Observable, throwError } from 'rxjs';
import { UserChange } from '../models/user-change';
import { UserCreation } from '../models/user-creation';
import { AccessUserForm } from '../user-form/user-form';
import { AccessUserInfo } from '../user-info/user-info';
import { UserList } from '../user-list/user-list';
import { AccessUserMemberEditor } from '../user-member-editor/user-member-editor';
import { UserRolesEditor } from '../user-roles-editor/user-roles-editor';
import { UserRolesInfo } from '../user-roles-info/user-roles-info';
import { UserService } from '../user-service';

@Component({
  selector: 'access-user-view',
  imports: [CardModule, TableModule, ButtonModule, PanelModule, DialogModule, MenuModule, AccessUserForm, AccessUserInfo, UserRolesEditor, AccessUserMemberEditor, UserRolesInfo, UserList],
  templateUrl: './user-view.html'
})
export class AccessList implements OnInit {

  private readonly service = inject(UserService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  @ViewChild('infoMenu') private infoMenu!: Menu;
  @ViewChild('editionMenu') private editionMenu!: Menu;

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public infoMenuItems: MenuItem[] = [];
  public editionMenuItems: MenuItem[] = [];

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

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
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("user", "create");
    this.editable = authContainer.hasPermission("user", "update");
    this.deletable = authContainer.hasPermission("user", "delete");

    // Load info menu
    this.infoMenuItems.push(
      {
        label: 'Datos',
        command: () => this.onShowInfo(this.selectedData)
      },
      {
        label: 'Roles',
        command: () => this.onShowRolesInfo(this.selectedData)
      }
    );
  }

  public ngOnInit(): void {
    this.load(0);
  }

  public onChangeDirection(sorting: { field: string, order: number }) {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  public onGetMember(username: string): Observable<Member> {
    return this.service.getMember(username);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onShowInfo(user: User) {
    this.selectedData = user;
    this.service.getMember(user.username).subscribe(member => this.member = member);
    this.showing = true;
  }

  public onShowRolesInfo(user: User) {
    this.selectedData = user;
    this.showingRoles = true;
  }

  public onInvite(toCreate: UserCreation): void {
    this.call(
      () => this.service.invite(toCreate),
      () => this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 })
    );
  }

  public onSetRoles(roles: Role[]): void {
    const user: UserChange = {
      username: this.selectedData.username,
      name: this.selectedData.name,
      email: this.selectedData.email,
      enabled: this.selectedData.enabled,
      passwordNotExpired: this.selectedData.passwordNotExpired,
      roles: [...roles.map(r => r.name)]
    }
    this.call(
      () => this.service.update(user),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onUpdate(toUpdate: UserChange): void {
    const user: UserChange = {
      ...toUpdate,
      enabled: this.selectedData.enabled,
      passwordNotExpired: this.selectedData.passwordNotExpired,
      roles: this.selectedData.roles.map(r => r.name)
    }
    this.call(
      () => this.service.update(user),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onAssignMember(member: Member): void {
    this.call(
      () => this.service.assignMember(this.selectedData.username, member),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onShowUser(user: User) {
    this.selectedData = user;
    this.service.getMember(user.username).subscribe(member => this.member = member);
    this.showing = true;
  }

  public onSetActive(status: boolean) {
    const userUpdate: UserChange = {
      ...this.selectedData,
      roles: this.selectedData.roles.map(r => r.name),
      enabled: status
    };
    this.call(
      () => this.service.update(userUpdate),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onDelete(id: string) {
    this.call(
      () => this.service.delete(id),
      () => this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 })
    );
  }

  public openInfoMenu(event: Event, user: User) {
    this.selectedData = user;

    this.infoMenu.toggle(event);
  }

  public openEditionMenu(event: Event, user: User) {
    this.selectedData = user;
    this.service.getMember(user.username).subscribe(member => this.member = member);
    this.service.getAvailableMembers(user.username).subscribe(members => this.availableMembers = members);

    this.editionMenuItems = [];

    // Load edition menu
    this.editionMenuItems.push(
      {
        label: 'Datos',
        command: () => this.onStartEditing(user, 'edition')
      });
    this.editionMenuItems.push(
      {
        label: 'Roles',
        command: () => this.onStartEditingRoles(user)
      });
    this.editionMenuItems.push(
      {
        label: 'Socio',
        command: () => this.onStartEditing(user, 'member')
      });
    // Active/Deactivate toggle
    const isActive = user.enabled;
    this.editionMenuItems.push({
      label: isActive ? 'Desactivar' : 'Activar',
      command: (method) => this.onSetActive(!isActive)
    });

    this.editionMenu.toggle(event);
  }

  public onStartInvitation(): void {
    this.service.getAllRoles().subscribe(r => this.roleSelection = r);
    this.view = 'invite';
    this.editing = true;
  }

  public onStartEditing(user: User, view: string): void {
    this.selectedData = user;
    if (view === 'member') {
      this.service.getMember(user.username).subscribe(member => this.member = member);
      this.service.getAvailableMembers(user.username).subscribe(members => this.availableMembers = members);
    }
    this.view = view;
    this.editing = true;
  }

  public load(page: number) {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

  private onStartEditingRoles(user: User): void {
    this.service.getAvailableRoles(this.selectedData.username).subscribe(r => this.roleSelection = r);
    this.onStartEditing(user, 'roles')
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
          this.load(0);
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
