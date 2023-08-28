import { Component, Input } from '@angular/core';
import { Role } from '@app/core/authentication/models/role';

@Component({
  selector: 'access-role-selection-list',
  templateUrl: './access-role-selection-list.component.html'
})
export class AccessRoleSelectionListComponent {

  @Input() public roles: Role[] = [];

}
