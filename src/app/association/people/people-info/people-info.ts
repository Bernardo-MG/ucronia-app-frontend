
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Person } from '@app/domain/person/person';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'assoc-people-info',
  imports: [CommonModule, SkeletonModule],
  templateUrl: './people-info.html'
})
export class PeopleInfo {

  public readonly data = input(new Person());
  public readonly loading = input(false);

  public get isMember() {
    return this.data().membership !== null;
  }

  public get isActive() {
    return this.data().membership?.active;
  }

  public get isRenewed() {
    return this.data().membership?.renew;
  }

}
