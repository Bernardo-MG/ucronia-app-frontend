import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Permission } from '@app/core/authentication/models/permission';

@Component({
  selector: 'access-role-privilege-form',
  templateUrl: './access-role-permission-form.component.html'
})
export class AccessRolePermissionFormComponent {

  @Input() public permissions: Permission[] = [];

  @Output() public addPermission = new EventEmitter<void>();

  @Output() public removePermission = new EventEmitter<Permission>();

  public onAdd() {
    this.addPermission.emit();
  }

  public onRemove(permission: Permission) {
    this.removePermission.emit(permission);
  }

}
