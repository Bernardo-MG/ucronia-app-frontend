import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
  selector: 'layout-pagination-info',
  standalone: true,
  imports: [PaginationNavigationComponent, JustifyCenterDirective],
  templateUrl: './pagination-info.component.html'
})
export class PaginationInfoComponent {

  @Input() public waiting = false;

  @Input() public page = new PaginatedResponse<any[]>([]);

  @Output() public goTo = new EventEmitter<number>();

}
