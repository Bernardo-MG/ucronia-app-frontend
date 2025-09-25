import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, output, SimpleChanges, viewChild } from '@angular/core';
import { ResourcePermission } from '@bernardo-mg/authentication';
import { ArrayPaginatedResponse, PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';
import { EMPTY, finalize, Observable } from 'rxjs';
import { AccessRoleAddPermission } from '../access-role-add-permission/access-role-add-permission';

@Component({
  selector: 'access-role-change-permission',
  imports: [CommonModule, TableModule, ButtonModule, AccessRoleAddPermission],
  templateUrl: './access-role-change-permission.html'
})
export class AccessRoleChangePermission implements OnChanges {

  public readonly getSelection = input<(page: number, sorting: Sorting) => Observable<PaginatedResponse<ResourcePermission>>>((page: number, sorting: Sorting) => EMPTY);
  public rolePermissions = input<ResourcePermission[]>([]);

  public addPermission = output<ResourcePermission>();
  public removePermission = output<ResourcePermission>();

  public assignedPermissions = new PaginatedResponse<ResourcePermission>();

  public permissionsSelection = new PaginatedResponse<ResourcePermission>();

  public loading = false;
  public choosingPermission = false;

  public view: string = 'details';

  public get firstRolePermission() {
    return (this.assignedPermissions.page - 1) * this.assignedPermissions.size;
  }

  private pageSize = 10;

  private permissionsSort = new Sorting();

  private readonly pickCloseButton = viewChild<any>('pickCloseButton');

  public ngOnChanges({ rolePermissions }: SimpleChanges): void {
    if (rolePermissions) {
      this.assignedPermissions = new ArrayPaginatedResponse<ResourcePermission>(this.rolePermissions(), 1, this.pageSize);
      this.onLoadPermissions(1);
    }
  }

  public onChangeView(newView: string) {
    this.view = newView;
  }

  public onAddPermission(permission: ResourcePermission): void {
    const page = this.assignedPermissions.page;
    this.assignedPermissions = new ArrayPaginatedResponse<ResourcePermission>(this.rolePermissions(), page, this.pageSize);
    this.choosingPermission = false;
    this.addPermission.emit(permission);
  }

  public onRemovePermission(permission: ResourcePermission): void {
    const page = this.assignedPermissions.page;
    this.assignedPermissions = new ArrayPaginatedResponse<ResourcePermission>(this.rolePermissions(), page, this.pageSize);
    this.removePermission.emit(permission);
  }

  public isAbleToAddPermission() {
    return true;
  }

  public onLoadPermissions(page: number) {
    this.loading = true;
    this.getSelection()(page, this.permissionsSort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.permissionsSelection = response);
  }

  public onChangePermissionsDirection(field: SortingProperty) {
    this.permissionsSort.addField(field);
    this.onLoadPermissions(0);
  }

  public onPermissionsPageChange(event: TablePageEvent) {
    const page = (event.first / this.pageSize) + 1;
    this.assignedPermissions = new ArrayPaginatedResponse<ResourcePermission>(this.rolePermissions(), page, this.pageSize);
  }

}
