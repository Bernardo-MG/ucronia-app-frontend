import { Component, Input } from '@angular/core';
import { Role } from '@app/core/authentication/models/role';

@Component({
  selector: 'access-role-info',
  templateUrl: './access-role-info.component.html',
  styleUrls: ['./access-role-info.component.sass']
})
export class AccessRoleInfoComponent {

  @Input() data = new Role();

}
