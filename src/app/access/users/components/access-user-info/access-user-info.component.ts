import { Component, Input } from '@angular/core';
import { User } from '@app/core/authentication/models/user';

@Component({
  selector: 'access-user-info',
  templateUrl: './access-user-info.component.html'
})
export class AccessUserInfoComponent {

  @Input() data = new User();

}
