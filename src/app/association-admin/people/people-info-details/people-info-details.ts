import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Person } from '@app/domain/person/person';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-people-info-details',
  imports: [SkeletonModule, DatePipe],
  templateUrl: './people-info-details.html'
})
export class PeopleInfoDetails {

  public readonly data = input(new Person());

  public readonly loading = input(false);

}
