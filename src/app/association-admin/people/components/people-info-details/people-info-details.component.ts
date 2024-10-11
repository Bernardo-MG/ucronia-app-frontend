import { Component, Input } from '@angular/core';
import { Person } from '@app/models/person/person';

@Component({
  selector: 'assoc-people-info-details',
  standalone: true,
  imports: [],
  templateUrl: './people-info-details.component.html'
})
export class PeopleInfoDetailsComponent {

  @Input() data = new Person();

  @Input() waiting = false;

}
