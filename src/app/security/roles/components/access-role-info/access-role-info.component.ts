import { Component, Input } from '@angular/core';
import { Role } from '@app/core/authentication/models/role';
import { PlaceholderDirective } from '@bernardo-mg/layout';

@Component({
    selector: 'access-role-info',
    imports: [PlaceholderDirective],
    templateUrl: './access-role-info.component.html'
})
export class AccessRoleInfoComponent {

  @Input() data = new Role();

  @Input() waiting = false;

}
