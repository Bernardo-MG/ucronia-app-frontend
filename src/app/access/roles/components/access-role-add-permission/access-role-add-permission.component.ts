import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Action } from '@app/core/authentication/models/action';
import { Permission } from '@app/core/authentication/models/permission';
import { Resource } from '@app/core/authentication/models/resource';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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
    this.service.getAllPermissions(page).subscribe({
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
