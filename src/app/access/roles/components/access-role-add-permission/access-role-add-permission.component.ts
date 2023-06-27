import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from '@app/core/authentication/models/action';
import { Permission } from '@app/core/authentication/models/permission';
import { Resource } from '@app/core/authentication/models/resource';

@Component({
  selector: 'access-role-add-permission',
  templateUrl: './access-role-add-permission.component.html',
  styleUrls: ['./access-role-add-permission.component.sass']
})
export class AccessRoleAddPermissionComponent {

  @Input() public actions: Action[] = [];

  @Input() public resources: Resource[] = [];

  @Output() public addPermission = new EventEmitter<Permission>();

  @Output() public selectPermission = new EventEmitter<Permission>();

  @Output() public selectAction = new EventEmitter<Permission>();

  public data = new Permission();

  public isAbleToAdd() {
    return true;
  }

  public onAddPermission(): void {
  }

  public onSelectPermission(): void {
    this.selectPermission.emit();
  }

  public onSelectAction(): void {
    this.selectAction.emit();
  }

}
