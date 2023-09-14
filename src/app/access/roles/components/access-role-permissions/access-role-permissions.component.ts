import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Action } from '@app/core/authentication/models/action';
import { Permission } from '@app/core/authentication/models/permission';
import { Resource } from '@app/core/authentication/models/resource';
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

  public actionSelection: Action[] = [];

  public permissionsPage = 0;

  public permissionsTotalPages = 0;

  public readingPermissions = false;

  public readingActionsSelection = false;

  public readingResourcesSelection = false;

  public totalActionPages = 0;

  public resourceSelection: Resource[] = [];

  public totalResourcePages = 0;

  constructor(
    private service: AccessRoleService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['roleId']) {
      this.loadPermissions(0);
      this.loadPermissionSelectionPage(0);
    }
  }

  public loadPermissions(page: number) {
    this.readingPermissions = true;
    this.service.getPermissions(this.roleId, page).subscribe({
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

  public onRemovePermission(permission: Permission): void {
    this.service.removePermission(this.roleId, permission.resourceId, permission.actionId).subscribe(p => this.loadPermissions(0));
  }

  public onAddPermission(permission: Permission): void {
    this.service.addPermission(this.roleId, permission.resourceId, permission.actionId).subscribe(p => this.loadPermissions(0));
  }

  public loadPermissionSelectionPage(page: number) {
    this.readingActionsSelection = true;
    this.service.getActionSelection(page).subscribe({
      next: response => {
        this.actionSelection = response.content;
        this.totalActionPages = response.totalPages;
        this.readingActionsSelection = false;
      },
      error: error => {
        this.readingActionsSelection = false;
      }
    });
    this.readingResourcesSelection = true;
    this.service.getResourceSelection(page).subscribe({
      next: response => {
        this.resourceSelection = response.content;
        this.totalResourcePages = response.totalPages;
        this.readingResourcesSelection = false;
      },
      error: error => {
        this.readingResourcesSelection = false;
      }
    });
  }

  public onGoToActionSelectionPage(page: number) {
    this.readingActionsSelection = true;
    this.service.getActionSelection(page).subscribe(response => {
      this.actionSelection = response.content;
      this.totalActionPages = response.totalPages;
      this.readingActionsSelection = false;
    });
  }

  public onGoToResourceSelectionPage(page: number) {
    this.readingResourcesSelection = true;
    this.service.getResourceSelection(page).subscribe(response => {
      this.resourceSelection = response.content;
      this.totalResourcePages = response.totalPages;
      this.readingResourcesSelection = false;
    });
  }

}
