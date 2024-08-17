import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { WaitingOverlayComponent } from '../waiting-overlay/waiting-overlay.component';

@Component({
  selector: 'layout-pagination-info-wrapper',
  standalone: true,
  imports: [WaitingOverlayComponent, PaginationNavigationComponent, JustifyCenterDirective],
  templateUrl: './pagination-info-wrapper.component.html'
})
export class PaginationInfoWrapperComponent {

  @Input() public waiting = false;

  @Input() public page = new PaginatedResponse<any[]>([]);

  @Output() public goTo = new EventEmitter<number>();

}
