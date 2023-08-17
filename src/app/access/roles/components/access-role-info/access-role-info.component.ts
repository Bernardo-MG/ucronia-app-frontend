import { Component, Input } from '@angular/core';
import { Role } from '@app/core/authentication/models/role';

@Component({
  selector: 'access-role-info',
  templateUrl: './access-role-info.component.html'
})
export class AccessRoleInfoComponent {

  @Input() data = new Role();

}
