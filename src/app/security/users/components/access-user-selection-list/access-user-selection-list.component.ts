import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { User } from '@bernardo-mg/authentication';
import { SortingProperty } from '@bernardo-mg/request';

@Component({
    selector: 'access-user-selection-list',
    imports: [CommonModule, RouterModule, SortingButtonComponent],
    templateUrl: './access-user-selection-list.component.html'
})
export class AccessUserSelectionListComponent {

  @Input() public users: User[] = [];

  @Input() public routeLinkAdapter: (data: User) => string = (data) => '';

  @Output() public changeDirection = new EventEmitter<SortingProperty>();

}
