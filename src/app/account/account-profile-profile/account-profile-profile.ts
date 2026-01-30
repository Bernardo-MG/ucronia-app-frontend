import { Component, input } from '@angular/core';
import { Profile } from '@bernardo-mg/security';

@Component({
  selector: 'account-profile-profile',
  imports: [],
  templateUrl: './account-profile-profile.html'
})
export class AccountProfileProfile {

  readonly data = input(new Profile());

}
