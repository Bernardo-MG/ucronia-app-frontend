import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SortField } from '@app/core/api/models/sort-field';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { SortingButtonComponent } from '@app/shared/sorting/sorting-button/sorting-button.component';
import { Member } from '../../models/member';

@Component({
  selector: 'assoc-member-list',
  standalone: true,
  imports: [CommonModule, RouterModule, IconsModule, WaitingWrapperComponent, SortingButtonComponent, PaginationNavigationComponent],
  templateUrl: './member-list.component.html'
})
export class MemberListComponent {

  @Input() public page = new PaginatedResponse<Member[]>([]);

  /**
   * Loading flag.
   */
  @Input() public waiting = false;

  @Output() public changeDirection = new EventEmitter<SortField>();

  @Output() public goTo = new EventEmitter<number>();

  public onChangeDirection(field: SortField) {
    this.changeDirection.emit(field);
  }

  public onGoTo(page: number) {
    this.goTo.emit(page);
  }

}
