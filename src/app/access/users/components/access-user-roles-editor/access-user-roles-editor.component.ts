import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '@app/core/authentication/models/role';
import { AccessUserAddRoleComponent } from '../access-user-add-role/access-user-add-role.component';
import { AccessUserRolesComponent } from '../access-user-roles/access-user-roles.component';

@Component({
  selector: 'access-user-roles-editor',
  standalone: true,
  imports: [CommonModule, AccessUserAddRoleComponent, AccessUserRolesComponent],
  templateUrl: './access-user-roles-editor.component.html'
})
export class AccessUserRolesEditorComponent {

  @Input() editable = false;

  @Input() deletable = false;

  @Input() waiting = false;

  @Input() username = '';

  @Input() roles: Role[] = [];

  @Output() public remove = new EventEmitter<Role>();

  @Output() public add = new EventEmitter<Role>();

  public view: 'list' | 'add' = 'list';

  public onAddRole(role: Role): void {
    this.add.emit(role);
    this.view = "list";
  }

  public onRemoveRole(role: Role): void {
    this.remove.emit(role);
  }

  public onShowAddRole() {
    this.view = "add";
  }

  public onCancelAddRole() {
    this.view = "list";
  }

}
