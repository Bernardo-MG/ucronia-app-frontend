import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SortProperty } from '@app/core/api/models/sort-field';
import { User } from '@app/core/authentication/models/user';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';

@Component({
  selector: 'access-user-selection-list',
  standalone: true,
  imports: [CommonModule, RouterModule, WaitingOverlayComponent, SortingButtonComponent],
  templateUrl: './access-user-selection-list.component.html'
})
export class AccessUserSelectionListComponent {

  @Input() public page = new PaginatedResponse<User[]>([]);

  /**
   * Loading flag.
   */
  @Input() public readingUsers = false;

  @Output() public changeDirection = new EventEmitter<SortProperty>();

  public onChangeDirection(field: SortProperty) {
    this.changeDirection.emit(field);
  }

}
