import { Component, Input } from '@angular/core';
import { Person } from '@app/models/person/person';
import { PlaceholderDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'assoc-people-info-details',
  imports: [PlaceholderDirective],
  templateUrl: './people-info-details.component.html'
})
export class PeopleInfoDetailsComponent {

  @Input() public data = new Person();

  @Input() public waiting = false;

}
