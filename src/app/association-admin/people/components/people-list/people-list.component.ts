import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortProperty } from '@app/core/api/models/sort-field';
import { Person } from '@app/models/person/person';
import { IconsModule } from '@app/shared/icons/icons.module';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';

@Component({
    selector: 'assoc-people-list',
    imports: [CommonModule, RouterModule, IconsModule, SortingButtonComponent],
    templateUrl: './people-list.component.html'
})
export class PeopleListComponent {

  @Input() public people: Person[] = [];

  @Input() public routeLinkAdapter: (data: Person) => string = (data) => '';

  @Output() public changeDirection = new EventEmitter<SortProperty>();

}
