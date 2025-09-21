
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Person } from '@app/domain/person/person';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { PeopleInfoDetails } from '../people-info-details/people-info-details';

@Component({
  selector: 'assoc-people-info',
  imports: [CommonModule, CardModule, TabsModule, PeopleInfoDetails],
  templateUrl: './people-info.html'
})
export class PeopleInfo {

  public readonly data = input(new Person());

  public get isMember() {
    return this.data().membership !== null;
  }

}
