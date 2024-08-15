import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SortProperty } from '@app/core/api/models/sort-field';
import { UserToken } from '@app/core/authentication/models/user-token';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';

@Component({
  selector: 'access-user-token-selection-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SortingButtonComponent],
  templateUrl: './user-token-selection-list.component.html'
})
export class UserTokenSelectionListComponent {

  @Input() public page = new PaginatedResponse<UserToken[]>([]);

  @Output() public changeDirection = new EventEmitter<SortProperty>();

}
