import { Component, Input } from '@angular/core';
import { Role } from '@bernardo-mg/authentication';
import { PlaceholderDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'access-role-info',
  imports: [PlaceholderDirective],
  templateUrl: './access-role-info.component.html'
})
export class AccessRoleInfoComponent {

  @Input() public data = new Role();

  @Input() public waiting = false;

}
