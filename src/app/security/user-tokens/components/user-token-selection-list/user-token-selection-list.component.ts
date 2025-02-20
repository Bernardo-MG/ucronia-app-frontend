import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserToken } from '@app/core/authentication/models/user-token';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { SortProperty } from '@bernardo-mg/request';

@Component({
    selector: 'access-user-token-selection-list',
    imports: [CommonModule, RouterModule, SortingButtonComponent],
    templateUrl: './user-token-selection-list.component.html'
})
export class UserTokenSelectionListComponent {

  @Input() public userTokens: UserToken[] = [];

  @Input() public routeLinkAdapter: (data: UserToken) => string = (data) => '';

  @Output() public changeDirection = new EventEmitter<SortProperty>();

}
