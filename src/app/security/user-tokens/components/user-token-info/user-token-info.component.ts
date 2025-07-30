
import { Component, input } from '@angular/core';
import { UserToken } from '@bernardo-mg/authentication';
import { FailureStore } from '@bernardo-mg/request';
import { PlaceholderDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'access-user-token-info',
  imports: [PlaceholderDirective],
  templateUrl: './user-token-info.component.html'
})
export class UserTokenInfoComponent {

  public readonly data = input(new UserToken());

  public readonly failures = input(new FailureStore());

  public readonly waiting = input(false);

}
