import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Role } from '@app/core/authentication/models/role';
import { AccessUserRolesComponent } from '../../info/access-user-roles/access-user-roles.component';
import { AccessUserAddRoleComponent } from '../access-user-add-role/access-user-add-role.component';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'access-user-roles-editor',
  standalone: true,
  imports: [CommonModule, IconsModule, AccessUserAddRoleComponent, AccessUserRolesComponent],
  templateUrl: './access-user-roles-editor.component.html'
})
export class AccessUserRolesEditorComponent {

  @Input() editable = false;

  @Input() deletable = false;

  @Input() waiting = false;

  @Input() waitingRolesSelection = false;

  @Input() username = '';

  @Input() roles: Role[] = [];

  @Input() rolesSelection = new PaginatedResponse<Role[]>([]);

  @Output() public remove = new EventEmitter<Role>();

  @Output() public add = new EventEmitter<Role>();

  @Output() public goToSelectionPage = new EventEmitter<number>();

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

  public onGoToSelectionPage(page: number): void {
    this.goToSelectionPage.emit(page);
  }

}
