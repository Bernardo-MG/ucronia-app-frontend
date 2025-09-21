import { Component, input } from '@angular/core';
import { Person } from '@app/domain/person/person';

@Component({
  selector: 'account-profile-person',
  imports: [],
  templateUrl: './account-profile-person.html'
})
export class AccountProfilePerson {

  readonly data = input(new Person());

}
