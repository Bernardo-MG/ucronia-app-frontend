import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Direction } from '@app/core/api/models/direction';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { Permission } from '@app/core/authentication/models/permission';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-permissions',
  templateUrl: './access-role-permissions.component.html'
})
export class AccessRolePermissionsComponent implements OnChanges {

  @Input() public roleId = -1;

  @Input() public editable = false;

  @Input() public deletable = false;

  public permissions: Permission[] = [];

  public permissionsPage = 0;

  public permissionsTotalPages = 0;

  public readingPermissions = false;

  public currentPage = 0;

  private sort: Sort<Permission>[] = [];

  constructor(
    private service: AccessRoleService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['roleId']) {
      this.load(undefined);
    }
  }

  public load(pagination: PaginationRequest | undefined) {
    this.readingPermissions = true;
    this.service.getPermissions(this.roleId, pagination).subscribe({
      next: response => {
        this.permissions = response.content;

        this.currentPage = response.page + 1;
        this.permissionsPage = response.page + 1;

        this.permissionsTotalPages = response.totalPages;
        this.readingPermissions = false;
      },
      error: error => {
        this.readingPermissions = false;
      }
    });
  }

  public onRemovePermission(permission: Permission): void {
    this.service.removePermission(this.roleId, permission.id).subscribe(p => this.load(undefined));
  }

  public onGoTo(page: number) {
    this.load({ page, sort: this.sort });
  }

  public onChangeDirection(sort: Sort<Permission>) {
    const index = this.sort.findIndex(s => s.property === sort.property);
    if (index < 0) {
      // New property to sort
      this.sort.push(sort);
    } else {
      if (sort.direction === Direction.Unsorted) {
        // Remove property
        this.sort = this.sort.filter(s => s.property !== sort.property);
      } else {
        // Replace property
        this.sort[index] = sort;
      }
    }
    this.load({ page: this.currentPage, sort: this.sort });
  }

}
