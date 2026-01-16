import { Component, inject, OnInit } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService, ResourcePermission, Role } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { finalize, Observable, throwError } from 'rxjs';
import { AccessRoleChangePermission } from '../role-change-permission/role-change-permission';
import { AccessRoleForm } from '../role-form/role-form';
import { AccessRoleInfo } from '../role-info/role-info';
import { RoleList } from '../role-list/role-list';
import { RoleService } from '../role-service';

@Component({
  selector: 'access-role-view',
  imports: [PanelModule, TableModule, ButtonModule, DialogModule, AccessRoleForm, AccessRoleInfo, AccessRoleChangePermission, RoleList],
  templateUrl: './role-view.html'
})
export class RoleView implements OnInit {

  private readonly service = inject(RoleService);
  private readonly messageService = inject(MessageService);

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<Role>();

  public selectedData = new Role();

  /**
   * Loading flag.
   */
  public loading = false;
  public showing = false;
  public editing = false;

  private sort = new Sorting();

  public view: string = '';

  public failures = new FailureStore();

  public permissions: ResourcePermission[] = [];

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.createable = authService.hasPermission("role", "create");
    this.editable = authService.hasPermission("role", "update");
    this.deletable = authService.hasPermission("role", "delete");
  }

  public ngOnInit(): void {
    this.load();
  }

  public onShowInfo(role: Role) {
    this.selectedData = role;
    this.showing = true;
  }

  public onChangeDirection(sorting: SortingEvent) {
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
    this.view = view;
    this.editing = true;
  }

  public onChangePermissions(role: Role) {
    this.selectedData = role;
    this.service.getAvailablePermissions(role.name).subscribe(p => this.permissions = p);
    this.onStartEditingView('permissions');
  }

  public onStartCreation(): void {
    this.service.getAllPermissions().subscribe(p => this.permissions = p);
    this.onStartEditingView('creation');
  }

  private onStartEditingView(view: string): void {
    this.view = view;
    this.editing = true;
  }

  private call(action: () => Observable<any>, onSuccess: () => void = () => { }) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.view = 'none';
          this.showing = false;
          this.editing = false;
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
