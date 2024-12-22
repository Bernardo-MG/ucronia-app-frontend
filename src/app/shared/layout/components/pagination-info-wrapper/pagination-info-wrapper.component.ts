import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { BlockUiDirective } from '../../directives/block-ui.directive';
import { PaginationInfoComponent } from '../pagination-info/pagination-info.component';

@Component({
  selector: 'layout-pagination-info-wrapper',
  standalone: true,
  imports: [PaginationInfoComponent, BlockUiDirective],
  templateUrl: './pagination-info-wrapper.component.html'
})
export class PaginationInfoWrapperComponent {

  @Input() public waiting = false;

  @Input() public page = new PaginatedResponse<any[]>([]);

  @Output() public goTo = new EventEmitter<number>();

}
