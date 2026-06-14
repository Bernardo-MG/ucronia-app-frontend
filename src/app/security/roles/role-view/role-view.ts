import { Component, inject, OnInit } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService, ResourcePermission, Role } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { finalize, Observable, throwError } from 'rxjs';
import { RoleChangePermission } from '../role-change-permission/role-change-permission';
import { RoleForm } from '../role-form/role-form';
import { RoleInfo } from '../role-info/role-info';
import { RoleList } from '../role-list/role-list';
import { RoleService } from '../role-service';

@Component({
  selector: 'access-role-view',
  imports: [PanelModule, TableModule, ButtonModule, DrawerModule, RoleForm, RoleInfo, RoleChangePermission, RoleList],
  templateUrl: './role-view.html'
})
export class RoleView implements OnInit {

  private readonly service = inject(RoleService);
  private readonly messageService = inject(MessageService);

  public readonly permissions: Permissions;
  public readonly Dialog = Dialog;

  public data = new Page<Role>();

  public selectedData = new Role();

  /**
   * Loading flag.
   */
  public loading = false;

  private sort = new Sorting();

  public failures = new FailureStore();

  public resourcePermissions: ResourcePermission[] = [];

  public dialog = Dialog.NONE;

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission("role", "create"),
      edit: authService.hasPermission("role", "update"),
      delete: authService.hasPermission("role", "delete")
    };
  }

  public ngOnInit(): void {
    this.load();
  }

  // EVENT HANDLERS

  public onShowInfo(role: Role) {
    this.selectedData = role;
    this.dialog = Dialog.INFO;
  }

  public onChangeDirection(sorting: SortingEvent) {
    // TODO: should receive the actual direction, not a number
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  public onCreate(toCreate: Role): void {
    this.call(
      () => this.service.create(toCreate),
      () => this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 })
    );
  }

  public onSetRolePermissions(permissions: ResourcePermission[]) {
    this.selectedData.permissions = permissions;

    this.call(
      () => this.service.update(this.selectedData),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onDelete(role: Role) {
    this.call(
      () => this.service.delete(role.name),
      () => this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 })
    );
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.load(page);
  }

  public load(page: number | undefined = undefined) {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

  public onStartEditing(role: Role, view: string): void {
    this.selectedData = role;
    this.dialog = Dialog.EDIT;
  }

  public onChangePermissions(role: Role) {
    this.selectedData = role;
    this.service.getAvailablePermissions(role.name).subscribe(p => this.resourcePermissions = p);
    this.dialog = Dialog.PERMISSIONS;
  }

  public onStartCreation(): void {
    this.service.getAllPermissions().subscribe(p => this.resourcePermissions = p);
    this.dialog = Dialog.CREATE;
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
  CREATE = 'create',
  PERMISSIONS = 'permissions'
}
