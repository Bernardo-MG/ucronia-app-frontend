
import { Component, input, output } from '@angular/core';
import { Role } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { PaginatedResponse } from '@bernardo-mg/request';
import { AccessUserAddRole } from '../access-user-add-role/access-user-add-role';
import { AccessUserRoles } from '../access-user-roles/access-user-roles';

@Component({
  selector: 'access-user-roles-editor',
  imports: [AccessUserAddRole, AccessUserRoles, IconAddComponent],
  templateUrl: './access-user-roles-editor.html'
})
export class AccessUserRolesEditor {

  readonly editable = input(false);

  readonly deletable = input(false);

  readonly waiting = input(false);

  readonly waitingRolesSelection = input(false);

  readonly username = input('');

  readonly roles = input<Role[]>([]);

  readonly rolesSelection = input(new PaginatedResponse<Role>());

  public readonly remove = output<Role>();

  public readonly add = output<Role>();

  public readonly goToSelectionPage = output<number>();

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
