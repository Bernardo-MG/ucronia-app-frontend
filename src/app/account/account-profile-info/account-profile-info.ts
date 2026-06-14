import { Component, input } from '@angular/core';
import { Profile } from '@ucronia/domain';

@Component({
  selector: 'account-profile-info',
  imports: [],
  templateUrl: './account-profile-info.html'
})
export class AccountProfileInfo {

  readonly data = input(new Profile());

}
