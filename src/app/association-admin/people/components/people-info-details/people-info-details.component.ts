import { Component, input } from '@angular/core';
import { Person } from '@app/models/person/person';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-people-info-details',
  imports: [SkeletonModule],
  templateUrl: './people-info-details.component.html'
})
export class PeopleInfoDetailsComponent {

  public readonly data = input(new Person());

  public readonly loading = input(false);

}
