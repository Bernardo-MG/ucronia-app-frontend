import { Component, input } from '@angular/core';
import { Profile } from '@ucronia/domain';

@Component({
  selector: 'account-profile-details',
  imports: [],
  templateUrl: './account-profile-details.html'
})
export class AccountProfileDetails {

  readonly data = input(new Profile());

}
