import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthContainer, ResourcePermission, Role } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { Menu, MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { finalize, Observable, throwError } from 'rxjs';
import { AccessRoleChangePermission } from '../access-role-change-permission/access-role-change-permission';
import { AccessRoleForm } from '../access-role-form/access-role-form';
import { AccessRoleInfo } from '../access-role-info/access-role-info';
import { AccessRoleService } from '../access-role-service';

@Component({
  selector: 'access-role-list',
  imports: [RouterModule, PanelModule, TableModule, ButtonModule, MenuModule, DrawerModule, IconAddComponent, AccessRoleForm, AccessRoleInfo, AccessRoleChangePermission],
  templateUrl: './access-role-list.html'
})
export class AccessRoleList implements OnInit {

  private readonly router = inject(Router);
  private readonly service = inject(AccessRoleService);

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

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("role", "create");
    this.editable = authContainer.hasPermission("role", "update");

    // Load edition menu
    this.editionMenuItems.push(
      {
        label: 'Cambiar permisos',
        command: () => this.onStartEditingView('permissions')
      });
  }

  public ngOnInit(): void {
    this.load(0);
  }

  public onShowInfo(role: Role) {
    this.selectedData = role;
    this.showing = true;
  }

  public onCreate(toCreate: Role): void {
    this.mutate(() => this.service.create(toCreate));
  }

  public openEditionMenu(event: Event, role: Role) {
    this.selectedData = role;
    this.editionMenu.toggle(event);
  }

  public getRolePermissionsSelection(page: number, sorting: Sorting) {
    return this.service.getAvailablePermissions(this.selectedData.name, page, sorting);
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

  public onAddRolePermission(permission: ResourcePermission) {
    this.selectedData.permissions.push(permission);

    this.mutate(() => this.service.update(this.selectedData));
  }

  public onRemoveRolePermission(permission: ResourcePermission) {
    this.selectedData.permissions = this.selectedData.permissions.filter(r => r.name != permission.name);

    this.mutate(() => this.service.update(this.selectedData));
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onSelectRow() {
    this.router.navigate([`/security/roles/${this.selectedData.name}`]);
  }

  public onStartEditingView(view: string): void {
    this.view = view;
    this.editing = true;
  }

  private load(page: number) {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

  private mutate(action: () => Observable<any>) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.view = 'none';
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
