import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Permission } from '@app/core/authentication/models/permission';
import { AccessRoleService } from '../../services/access-role.service';
import { Sort } from '@app/core/api/models/sort';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';

@Component({
  selector: 'access-role-add-permission',
  templateUrl: './access-role-add-permission.component.html'
})
export class AccessRoleAddPermissionComponent implements OnChanges {

  @Input() public role = "";

  @Output() public addPermission = new EventEmitter<Permission>();

  public response = new PaginatedResponse<Permission[]>([]);

  public readingPermissions = false;

  public data = new Permission();

  private sort: Sort[] = [];

  constructor(
    private service: AccessRoleService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['role']) {
      this.load(undefined);
    }
  }

  public onAddPermission(permission: Permission): void {
    this.service.addPermission(this.role, permission.name).subscribe(p => {
      this.addPermission.emit(permission);
    });
  }

  public onGoTo(page: number) {
    this.load({ page, sort: this.sort });
  }

  public onChangeDirection(sort: Sort) {
    const index = this.sort.findIndex(s => s.property === sort.property);
    if (index < 0) {
      // New property to sort
      this.sort.push(sort);
    } else {
      // Replace property
      this.sort[index] = sort;
    }
    this.load({ page: this.response.currentPage(), sort: this.sort });
  }

  private load(pagination: PaginationRequest | undefined) {
    this.readingPermissions = true;
    this.service.getAvailablePermissions(this.role, pagination).subscribe({
      next: response => {
        this.response = response;

        // Reactivate view
        this.readingPermissions = false;
      },
      error: error => {
        // Reactivate view
        this.readingPermissions = false;
      }
    });
  }

}
