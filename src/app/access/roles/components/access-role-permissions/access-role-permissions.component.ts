import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SortField } from '@app/core/api/models/sort-field';
import { Permission } from '@app/core/authentication/models/permission';
import { AccessRoleService } from '../../services/access-role.service';
import { Sort } from '@app/core/api/models/sort';

@Component({
  selector: 'access-role-permissions',
  templateUrl: './access-role-permissions.component.html'
})
export class AccessRolePermissionsComponent implements OnChanges {

  @Input() public role = "";

  @Input() public editable = false;

  @Input() public deletable = false;

  public response = new PaginatedResponse<Permission[]>([]);

  public readingPermissions = false;

  private sort = new Sort([]);

  constructor(
    private service: AccessRoleService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if ((changes['role']) && (this.role.length)) {
      this.load(0);
    }
  }

  public onRemovePermission(permission: Permission): void {
    this.service.removePermission(this.role, permission.name).subscribe(p => this.load(0));
  }

  public onGoTo(page: number) {
    this.load(page);
  }

  public onChangeDirection(field: SortField) {
    this.sort.addField(field);

    this.load(this.response.currentPage);
  }

  private load(page: number) {
    this.readingPermissions = true;
    this.service.getPermissions(this.role, page, this.sort).subscribe({
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
