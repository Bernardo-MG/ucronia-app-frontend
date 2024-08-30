import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { BlockUiDirective } from '../../directives/block-ui.directive';

@Component({
  selector: 'layout-pagination-info-wrapper',
  standalone: true,
  imports: [PaginationNavigationComponent, JustifyCenterDirective, BlockUiDirective],
  templateUrl: './pagination-info-wrapper.component.html'
})
export class PaginationInfoWrapperComponent {

  @Input() public waiting = false;

  @Input() public page = new PaginatedResponse<any[]>([]);

  @Output() public goTo = new EventEmitter<number>();

}
