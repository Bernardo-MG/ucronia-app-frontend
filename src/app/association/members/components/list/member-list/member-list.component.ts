import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SortField } from '@app/core/api/models/sort-field';
import { IconsModule } from '@app/shared/icons/icons.module';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { Member } from '../../../models/member';

@Component({
  selector: 'assoc-member-list',
  standalone: true,
  imports: [CommonModule, RouterModule, IconsModule, SortingButtonComponent],
  templateUrl: './member-list.component.html'
})
export class MemberListComponent {

  @Input() public page = new PaginatedResponse<Member[]>([]);

  @Output() public changeDirection = new EventEmitter<SortField>();

  public onChangeDirection(field: SortField) {
    this.changeDirection.emit(field);
  }

}
