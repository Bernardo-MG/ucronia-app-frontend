import { Component, OnInit } from '@angular/core';
import { Fee } from '@app/association/fees/models/fee';
import { UserFeeService } from '@app/association/user-fees/services/user-fee.service';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { UserFeeListComponent } from '../../list/user-fee-list/user-fee-list.component';

@Component({
  selector: 'assoc-user-fee-list-widget',
  standalone: true,
  imports: [WaitingWrapperComponent, PaginationNavigationComponent, UserFeeListComponent],
  templateUrl: './user-fee-list-widget.component.html'
})
export class UserFeeListWidgetComponent implements OnInit {

  public page = new PaginatedResponse<Fee[]>([]);

  /**
   * Loading flag.
   */
  public readingFees = false;

  constructor(
    private service: UserFeeService
  ) { }

  ngOnInit(): void {
    this.service.getAll(0).subscribe({
      next: response => {
        this.page = response;

        // Reactivate view
        this.readingFees = false;
      },
      error: error => {
        // Reactivate view
        this.readingFees = false;
      }
    });
  }

  public load(page: number) {
    this.readingFees = true;

    this.service.getAll(page).subscribe({
      next: response => {
        this.page = response;

        // Reactivate view
        this.readingFees = false;
      },
      error: error => {
        // Reactivate view
        this.readingFees = false;
      }
    });
  }

}
