
import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { Role } from '@bernardo-mg/authentication';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { EMPTY, Observable } from 'rxjs';
import { AccessUserAddRole } from '../access-user-add-role/access-user-add-role';
import { AccessUserRoles } from '../access-user-roles/access-user-roles';

@Component({
  selector: 'access-user-roles-editor',
  imports: [ButtonModule, AccessUserAddRole, AccessUserRoles],
  templateUrl: './access-user-roles-editor.html'
})
export class AccessUserRolesEditor implements OnChanges {

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<Role>>>((page: number) => EMPTY);
  public readonly waiting = input(false);
  public readonly roles = input<Role[]>([]);

  public readonly save = output<Role[]>();
  public readonly goToSelectionPage = output<number>();

  public view: 'list' | 'add' = 'list';

  public selection: Role[] = [];

  public ngOnChanges({ roles }: SimpleChanges): void {
    if (roles) {
      this.selection = [...roles.currentValue];
    }
  }

  public onAddRole(role: Role): void {
    this.selection = [...this.selection, role];
    this.view = 'list';
  }

  public onRemoveRole(role: Role): void {
    this.selection = [...this.selection.filter(r => r.name != role.name)];
  }

  public onShowAddRole() {
    this.view = "add";
  }

  public onCancelAddRole() {
    this.view = "list";
  }

}
