
import { Component, input, output } from '@angular/core';
import { Role } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { PaginatedResponse } from '@bernardo-mg/request';
import { AccessUserAddRole } from '../access-user-add-role/access-user-add-role';
import { AccessUserRoles } from '../access-user-roles/access-user-roles';
import { Observable, EMPTY } from 'rxjs';

@Component({
  selector: 'access-user-roles-editor',
  imports: [AccessUserAddRole, AccessUserRoles, IconAddComponent],
  templateUrl: './access-user-roles-editor.html'
})
export class AccessUserRolesEditor {

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<Role>>>((page: number) => EMPTY);
  public readonly waiting = input(false);
  public readonly username = input('');
  public readonly roles = input<Role[]>([]);

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

}
