import { Component, input } from '@angular/core';
import { User } from '@bernardo-mg/authentication';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';

@Component({
  selector: 'access-user-status',
  imports: [IconSuccessOrFailureComponent],
  templateUrl: './access-user-status.html'
})
export class AccessUserStatus {

  readonly data = input(new User());

}
