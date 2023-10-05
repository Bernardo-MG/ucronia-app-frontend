import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Permission } from '@app/core/authentication/models/permission';
import { AccessRoleService } from '../../services/access-role.service';

@Component({
  selector: 'access-role-add-permission',
  templateUrl: './access-role-add-permission.component.html'
})
export class AccessRoleAddPermissionComponent implements OnChanges {

  @Input() public roleId = 0;

  @Output() public addPermission = new EventEmitter<Permission>();

  public permissions: Permission[] = [];

  public permissionsPage = 0;

  public permissionsTotalPages = 0;

  public readingPermissions = false;

  public data = new Permission();

  constructor(
    private service: AccessRoleService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['roleId']) {
      this.onGoTo(0);
    }
  }

  public onAddPermission(permission: Permission): void {
    this.service.addPermission(this.roleId, permission.id).subscribe(p => {
      this.addPermission.emit(permission);
    });
  }

  public onGoTo(page: number) {
    this.readingPermissions = true;
    this.service.getAvailablePermissions(this.roleId, {page}).subscribe({
      next: response => {
        this.permissions = response.content;

        this.permissionsPage = response.page + 1;
        this.permissionsTotalPages = response.totalPages;

        this.readingPermissions = false;
      },
      error: error => {
        this.readingPermissions = false;
      }
    });
  }

}
