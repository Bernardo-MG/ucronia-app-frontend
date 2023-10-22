import { Component, Input } from '@angular/core';
import { UserToken } from '@app/core/authentication/models/user-token';

@Component({
  selector: 'access-user-token-info',
  templateUrl: './user-token-info.component.html'
})
export class UserTokenInfoComponent {

  @Input() data = new UserToken();

}
