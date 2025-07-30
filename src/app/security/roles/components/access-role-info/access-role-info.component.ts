import { Component, input } from '@angular/core';
import { Role } from '@bernardo-mg/authentication';
import { PlaceholderDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'access-role-info',
  imports: [PlaceholderDirective],
  templateUrl: './access-role-info.component.html'
})
export class AccessRoleInfoComponent {

  public readonly data = input(new Role());

  public readonly waiting = input(false);

}
