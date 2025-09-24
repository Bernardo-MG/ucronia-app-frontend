import { Component, input } from '@angular/core';
import { User } from '@bernardo-mg/authentication';

@Component({
  selector: 'access-user-status',
  templateUrl: './access-user-status.html'
})
export class AccessUserStatus {

  readonly data = input(new User());

}
