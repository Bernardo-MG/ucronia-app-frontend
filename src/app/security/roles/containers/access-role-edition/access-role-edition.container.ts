import { CommonModule } from '@angular/common';
import { Component, inject, viewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer, ResourcePermission, Role } from '@bernardo-mg/authentication';
import { InfoEditorStatusComponent } from '@bernardo-mg/form';
import { IconAddComponent } from '@bernardo-mg/icons';
import { ArrayPaginatedResponse, PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { ModalComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule, TablePageEvent } from 'primeng/table';
import { Observable } from 'rxjs';
import { AccessRoleAddPermissionComponent } from '../../components/access-role-add-permission/access-role-add-permission.component';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-edition',
  imports: [CommonModule, CardModule, FormsModule, ReactiveFormsModule, SkeletonModule, TableModule, AccessRoleAddPermissionComponent, ModalComponent, IconAddComponent, ResponsiveShortColumnsDirective],
  templateUrl: './access-role-edition.container.html'
})
export class AccessRoleInfoEditionContainer extends InfoEditorStatusComponent<Role> {

  private readonly router = inject(Router);

  private readonly service = inject(AccessRoleService);

  public permissions = new PaginatedResponse<ResourcePermission>();

  public loadingPermissions = false;

  public view: string = 'details';

  public rolePermissions = new ArrayPaginatedResponse<ResourcePermission>([], 1, 0);

  public get firstRolePermission() {
    return (this.rolePermissions.page - 1) * this.rolePermissions.size;
  }

  private pageSize = 10;

  private permissionsSort = new Sorting();

  private role = '';

  private readonly pickCloseButton = viewChild<any>('pickCloseButton');

  constructor() {
    const route = inject(ActivatedRoute);
    const authContainer = inject(AuthContainer);

    super(new Role());
    // Check permissions
    this.editable = false;
    this.deletable = authContainer.hasPermission("user", "delete");

    // Get id
    route.paramMap.subscribe(params => {
      const roleParam = params.get('role');
      if (roleParam) {
        this.role = roleParam;
        this.load();

        // Initial permissions
        this.onLoadPermissions(0);
      }
    });
  }

  public onChangeView(newView: string) {
    this.view = newView;
  }

  public onAddPermission(permission: ResourcePermission): void {
    this.data.permissions.push(permission);
    const page = this.rolePermissions.page;
    this.rolePermissions = new ArrayPaginatedResponse<ResourcePermission>(this.data.permissions, page, this.pageSize);
    this.onSave(this.data);
    this.pickCloseButton().nativeElement.click();
  }

  public onRemovePermission(permission: ResourcePermission): void {
    this.data.permissions = this.data.permissions.filter(r => r.name != permission.name);
    const page = this.rolePermissions.page;
    this.rolePermissions = new ArrayPaginatedResponse<ResourcePermission>(this.data.permissions, page, this.pageSize);
    this.onSave(this.data);
  }

  public isAbleToAddPermission() {
    return true;
  }

  public onLoadPermissions(page: number) {
    this.loadingPermissions = true;
    this.service.getAvailablePermissions(this.role, page, this.permissionsSort).subscribe({
      next: response => {
        this.permissions = response;
        this.loadingPermissions = false;
      }
    });
  }

  public onChangePermissionsDirection(field: SortingProperty) {
    this.permissionsSort.addField(field);
    this.onLoadPermissions(0);
  }

  public onPermissionsPageChange(event: TablePageEvent) {
    const page = (event.first / this.pageSize) + 1;
    this.rolePermissions = new ArrayPaginatedResponse<ResourcePermission>(this.data.permissions, page, this.pageSize);
  }

  protected override onLoad(data: Role): void {
    this.data = data;
    this.rolePermissions = new ArrayPaginatedResponse<ResourcePermission>(this.data.permissions, 1, this.pageSize);
  }

  protected override delete(): void {
    this.service.delete(this.data.name).subscribe(r => {
      this.router.navigate([`/security/roles`]);
    });
  }

  protected override read(): Observable<Role> {
    return this.service.getOne(this.role);
  }

  protected override save(toSave: Role): Observable<Role> {
    return this.service.update(toSave.name, toSave);
  }

  protected override interceptSave(response: Role) {
    super.interceptSave(response);
    this.onLoadPermissions(0);
  }

}
