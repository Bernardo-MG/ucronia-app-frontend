import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SortField } from '@app/core/api/models/sort-field';
import { User } from '@app/core/authentication/models/user';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationModule } from '@app/shared/pagination/pagination.module';

@Component({
  selector: 'access-user-selection-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationModule, WaitingWrapperComponent],
  templateUrl: './access-user-selection-list.component.html'
})
export class AccessUserSelectionListComponent {

  @Input() public page = new PaginatedResponse<User[]>([]);

  /**
   * Loading flag.
   */
  @Input() public readingUsers = false;

  @Output() public changeDirection = new EventEmitter<SortField>();

  public onChangeDirection(field: SortField) {
    this.changeDirection.emit(field);
  }

}
