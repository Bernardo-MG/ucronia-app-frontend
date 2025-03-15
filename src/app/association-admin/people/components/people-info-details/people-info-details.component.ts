import { Component, Input } from '@angular/core';
import { Person } from '@app/models/person/person';
import { PlaceholderDirective } from '@bernardo-mg/layout';

@Component({
  selector: 'assoc-people-info-details',
  imports: [PlaceholderDirective],
  templateUrl: './people-info-details.component.html'
})
export class PeopleInfoDetailsComponent {

  @Input() data = new Person();

  @Input() waiting = false;

}
