import { Component, Input } from '@angular/core';
import { Role } from '@app/core/authentication/models/role';

@Component({
  selector: 'access-role-info',
  standalone: true,
  imports: [],
  templateUrl: './access-role-info.component.html'
})
export class AccessRoleInfoComponent {

  @Input() data = new Role();

}
