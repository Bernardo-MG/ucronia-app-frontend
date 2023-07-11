import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Permission } from '@app/core/authentication/models/permission';

@Component({
  selector: 'access-role-permissions',
  templateUrl: './access-role-permissions.component.html'
})
export class AccessRolePermissionsComponent {

  @Input() public permissions: Permission[] = [];

  @Output() public removePermission = new EventEmitter<Permission>();

  public onRemove(permission: Permission) {
    this.removePermission.emit(permission);
  }

}
