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
import { AccessUserForm } from '../access-user-form/access-user-form';
import { AccessUserInfo } from '../access-user-info/access-user-info';
import { AccessUserMemberEditor } from '../access-user-member-editor/access-user-member-editor';
import { AccessUserRolesEditor } from '../access-user-roles-editor/access-user-roles-editor';
import { AccessUserService } from '../access-user-service';
import { UserUpdate } from '../models/user-update';

@Component({
  selector: 'access-user-list',
  imports: [CardModule, TableModule, ButtonModule, PanelModule, DialogModule, MenuModule, AccessUserForm, AccessUserInfo, AccessUserRolesEditor, AccessUserMemberEditor],
  templateUrl: './access-user-list.html'
})
export class AccessList implements OnInit {

  private readonly service = inject(AccessUserService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  @ViewChild('editionMenu') private editionMenu!: Menu;

  public readonly createable;
  public readonly editable;
  public readonly deletable;

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

  public view: string = '';

  private sort = new Sorting();

  public failures = new FailureStore();

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("user", "create");
    this.editable = authContainer.hasPermission("user", "update");
    this.deletable = authContainer.hasPermission("user", "delete");
  }

  public ngOnInit(): void {
    this.load(0);
  }

  public onChangeDirection(sorting: { field: string, order: number }) {
    let direction;
    if (sorting.order == 1) {
      direction = SortingDirection.Ascending;
    } else {
      direction = SortingDirection.Descending;
    }
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  public onLoadRoles(page: number) {
    return this.service.getAvailableRoles(this.selectedData.username, page);
  }

  public onLoadMembers(page: number) {
    return this.service.getAvailableMembers(this.selectedData.username, page);
  }

  public onGetMember(username: string) {
    return this.service.getMember(username);
  }

  public onAddRole(role: Role): void {
    const userUpdate: UserUpdate = {
      ...this.selectedData,
      roles: this.selectedData.roles.map(r => r.name)
    };
    userUpdate.roles.push(role.name);
    this.call(() => this.service.update(userUpdate));
  }

  public onRemoveRole(role: Role): void {
    const userUpdate: UserUpdate = {
      ...this.selectedData,
      roles: this.selectedData.roles.map(r => r.name)
    };
    userUpdate.roles = userUpdate.roles.filter(r => r != role.name);
    this.call(() => this.service.update(userUpdate));
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

  public onCreate(toCreate: UserUpdate): void {
    const user: User = {
      ...toCreate,
      roles: [],
      notExpired: true,
      notLocked: true
    };
    this.call(() => this.service.create(user));
  }

  public onUpdate(toUpdate: UserUpdate): void {
    this.call(() => this.service.update(toUpdate));
  }

  public onAssignMember(member: Member): void {
    this.call(() => this.service.assignMember(this.selectedData.username, member));
  }

  public onSetActive(event: Event, status: boolean) {
    let message;
    if (status) {
      message = '¿Estás seguro de querer activar el usuario?';
    } else {
      message = '¿Estás seguro de querer desactivar el usuario?';
    }
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message,
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
      accept: () => {
        const userUpdate: UserUpdate = {
          ...this.selectedData,
          roles: this.selectedData.roles.map(r => r.name),
          enabled: status
        };
        this.call(() => this.service.update(userUpdate));
      }
    });
  }

  public onDelete(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Quieres borrar estos datos?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        this.call(() => this.service.delete(id));
        return this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 });
      }
    });
  }

  public openEditionMenu(event: Event, user: User) {
    this.selectedData = user;
    this.service.getMember(user.username).subscribe(member => this.member = member);

    this.editionMenuItems = [];

    // Load edition menu
    this.editionMenuItems.push(
      {
        label: 'Datos',
        command: () => this.onStartEditing(user, 'details')
      });
    this.editionMenuItems.push(
      {
        label: 'Roles',
        command: () => this.onStartEditing(user, 'roles')
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
      command: () => this.onSetActive(event, !isActive)
    });

    this.editionMenu.toggle(event);
  }

  public onStartCreating(): void {
    this.view = 'creation';
    this.editing = true;
  }

  public onStartEditing(item: User, view: string): void {
    this.selectedData = item;
    this.view = view;
    this.editing = true;
  }

  private load(page: number) {
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
          this.load(1);
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
