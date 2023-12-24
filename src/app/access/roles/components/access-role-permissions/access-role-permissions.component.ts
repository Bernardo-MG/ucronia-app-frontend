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

  @Input() public role = "";

  @Input() public editable = false;

  @Input() public deletable = false;

  public permissions: Permission[] = [];

  public readingPermissions = false;

  public currentPage = 0;

  public totalPages = 0;

  private sort: Sort<Permission>[] = [];

  constructor(
    private service: AccessRoleService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes['role']) && (this.role.length)) {
      this.load(undefined);
    }
  }

  public onRemovePermission(permission: Permission): void {
    this.service.removePermission(this.role, permission.name).subscribe(p => this.load(undefined));
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
      // Replace property
      this.sort[index] = sort;
    }
    this.load({ page: this.currentPage, sort: this.sort });
  }

  private load(pagination: PaginationRequest | undefined) {
    this.readingPermissions = true;
    this.service.getPermissions(this.role, pagination).subscribe({
      next: response => {
        this.permissions = response.content;

        this.currentPage = response.page + 1;

        this.totalPages = response.totalPages;
        this.readingPermissions = false;
      },
      error: error => {
        this.readingPermissions = false;
      }
    });
  }

}
