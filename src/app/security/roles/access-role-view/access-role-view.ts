import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AuthContainer, ResourcePermission, Role } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Menu, MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { finalize, Observable, throwError } from 'rxjs';
import { AccessRoleChangePermission } from '../access-role-change-permission/access-role-change-permission';
import { AccessRoleForm } from '../access-role-form/access-role-form';
import { AccessRoleInfo } from '../access-role-info/access-role-info';
import { AccessRoleService } from '../access-role-service';

@Component({
  selector: 'access-role-view',
  imports: [PanelModule, TableModule, ButtonModule, MenuModule, DialogModule, AccessRoleForm, AccessRoleInfo, AccessRoleChangePermission],
  templateUrl: './access-role-view.html'
})
export class AccessRoleList implements OnInit {

  private readonly service = inject(AccessRoleService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  @ViewChild('editionMenu') editionMenu!: Menu;

  public readonly createable;
  public readonly editable;

  public readonly editionMenuItems: MenuItem[] = [];

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
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("role", "create");
    this.editable = authContainer.hasPermission("role", "update");

    // Load edition menu
    this.editionMenuItems.push(
      {
        label: 'Cambiar permisos',
        command: () => this.onChangePermissions()
      });
  }

  public ngOnInit(): void {
    this.load(0);
  }

  public onShowInfo(role: Role) {
    this.selectedData = role;
    this.showing = true;
  }

  public openEditionMenu(event: Event, role: Role) {
    this.selectedData = role;
    this.editionMenu.toggle(event);
  }

  public onChangeDirection(sorting: { field: string, order: number }) {
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

  public onDelete(event: Event, role: Role) {
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
          () => this.service.delete(role.name),
          () => this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 })
        )
    });
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  private onChangePermissions() {
    this.service.getAvailablePermissions(this.selectedData.name).subscribe(p => this.permissions = p);
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
          this.showing = false;
          this.editing = false;
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
