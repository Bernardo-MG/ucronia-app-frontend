import { Component, Input } from '@angular/core';
import { Person } from '@app/models/person/person';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';

@Component({
  selector: 'assoc-people-info-details',
  standalone: true,
  imports: [PlaceholderDirective],
  templateUrl: './people-info-details.component.html'
})
export class PeopleInfoDetailsComponent {

  @Input() data = new Person();

  @Input() waiting = false;

}
