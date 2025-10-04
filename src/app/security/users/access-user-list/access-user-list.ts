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
import { UserChange } from '../models/user-change';

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

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onShowInfo(user: User) {
    this.selectedData = user;
    this.service.getMember(user.username).subscribe(member => this.member = member);
    this.showing = true;
  }

  public onCreate(toCreate: UserChange): void {
    const user: User = {
      ...toCreate,
      roles: [],
      notExpired: true,
      notLocked: true
    };
    this.call(
      () => this.service.create(user),
      () => this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 })
    );
  }

  public onAddRole(role: Role): void {
    const user: UserChange = {
      username: this.selectedData.username,
      name: this.selectedData.name,
      email: this.selectedData.email,
      enabled: this.selectedData.enabled,
      passwordNotExpired: this.selectedData.passwordNotExpired,
      roles: [...this.selectedData.roles.map(r => r.name), role.name]
    }
    this.call(
      () => this.service.update(user),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onRemoveRole(role: Role): void {
    const user: UserChange = {
      username: this.selectedData.username,
      name: this.selectedData.name,
      email: this.selectedData.email,
      enabled: this.selectedData.enabled,
      passwordNotExpired: this.selectedData.passwordNotExpired,
      roles: this.selectedData.roles.map(r => r.name).filter(r => r != role.name)
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
      accept: () =>
        this.call(
          () => this.service.delete(id),
          () => this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 })
        )
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
        command: () => this.onStartEditing(user, 'edition')
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
