import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationNavigationComponent } from '../pagination-navigation/pagination-navigation.component';

@Component({
  selector: 'pagination-navigation-info',
  standalone: true,
  imports: [PaginationNavigationComponent],
  templateUrl: './pagination-navigation-info.component.html'
})
export class PaginationNavigationInfoComponent {

  @Input() public page = new PaginatedResponse<any[]>([]);

  @Input() public disabled = false;

  @Output() public goTo = new EventEmitter<number>();

}
