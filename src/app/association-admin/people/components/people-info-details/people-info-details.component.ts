import { Component, input } from '@angular/core';
import { Person } from '@app/models/person/person';
import { PlaceholderDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'assoc-people-info-details',
  imports: [PlaceholderDirective],
  templateUrl: './people-info-details.component.html'
})
export class PeopleInfoDetailsComponent {

  public readonly data = input(new Person());

  public readonly waiting = input(false);

}
