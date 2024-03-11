import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SortField } from '@app/core/api/models/sort-field';
import { Permission } from '@app/core/authentication/models/permission';
import { AccessRoleService } from '../../services/access-role.service';
import { Sort } from '@app/core/api/models/sort';

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

  private sort = new Sort([]);

  constructor(
    private service: AccessRoleService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['role']) {
      this.load(0);
    }
  }

  public onAddPermission(permission: Permission): void {
    this.service.addPermission(this.role, permission.name).subscribe(p => {
      this.addPermission.emit(permission);
    });
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
    this.service.getAvailablePermissions(this.role, page, this.sort).subscribe({
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
