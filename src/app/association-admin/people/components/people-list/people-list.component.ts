import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Person } from '@app/models/person/person';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';
import { SortingProperty } from '@bernardo-mg/request';

@Component({
  selector: 'assoc-people-list',
  imports: [CommonModule, RouterModule, SortingButtonComponent, IconSuccessOrFailureComponent],
  templateUrl: './people-list.component.html'
})
export class PeopleListComponent {

  @Input() public people: Person[] = [];

  @Input() public routeLinkAdapter: (data: Person) => string = (data) => '';

  @Output() public changeDirection = new EventEmitter<SortingProperty>();

}
