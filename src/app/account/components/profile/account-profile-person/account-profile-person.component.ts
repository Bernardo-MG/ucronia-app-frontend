import { Component, Input } from '@angular/core';
import { Person } from '@app/models/person/person';

@Component({
  selector: 'account-profile-person',
  standalone: true,
  imports: [],
  templateUrl: './account-profile-person.component.html'
})
export class AccountProfilePersonComponent {

  @Input() data = new Person();

}
