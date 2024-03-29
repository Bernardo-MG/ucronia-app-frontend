import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SortField } from '@app/core/api/models/sort-field';
import { Role } from '@app/core/authentication/models/role';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationModule } from '@app/shared/pagination/pagination.module';

@Component({
  selector: 'access-role-selection-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationModule, WaitingWrapperComponent],
  templateUrl: './access-role-selection-list.component.html'
})
export class AccessRoleSelectionListComponent {

  @Input() public page = new PaginatedResponse<Role[]>([]);

  /**
   * Loading flag.
   */
  @Input() public waiting = false;

  @Output() public changeDirection = new EventEmitter<SortField>();

  constructor() { }

  public onChangeDirection(field: SortField) {
    this.changeDirection.emit(field);
  }

}
