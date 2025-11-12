import { Component, input } from '@angular/core';
import { Contact } from '@app/domain/contact/contact';

@Component({
  selector: 'account-profile-contact',
  imports: [],
  templateUrl: './account-profile-contact.html'
})
export class AccountProfileContact {

  readonly data = input(new Contact());

}
