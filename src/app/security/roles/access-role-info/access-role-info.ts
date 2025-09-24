import { CommonModule } from '@angular/common';
import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResourcePermission, Role } from '@bernardo-mg/authentication';
import { ArrayPaginatedResponse } from '@bernardo-mg/request';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'access-role-info',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SkeletonModule, TableModule],
  templateUrl: './access-role-info.html'
})
export class AccessRoleInfo implements OnChanges {

  public readonly data = input(new Role());
  public readonly loading = input(false);

  public loadingPermissions = false;

  public view: string = 'details';

  public rolePermissions = new ArrayPaginatedResponse<ResourcePermission>([], 1, 0);

  public get firstRolePermission() {
    return (this.rolePermissions.page - 1) * this.rolePermissions.size;
  }

  private pageSize = 10;

  public ngOnChanges({ data }: SimpleChanges): void {
    if (data) {
      this.rolePermissions = new ArrayPaginatedResponse<ResourcePermission>(this.data().permissions, 1, this.pageSize);
    }
  }

  public onChangeView(newView: string) {
    this.view = newView;
  }

  public onPermissionsPageChange(event: TablePageEvent) {
    const page = (event.first / this.pageSize) + 1;
    this.rolePermissions = new ArrayPaginatedResponse<ResourcePermission>(this.data().permissions, page, this.pageSize);
  }

}
