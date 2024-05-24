import { Component, OnInit } from '@angular/core';
import { Fee } from '@app/association/fees/models/fee';
import { MyFeesService } from '@app/association/my-fees/services/my-fees.service';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { MyFeesListComponent } from '../../list/my-fees-list/my-fees-list.component';

@Component({
  selector: 'assoc-my-fees-list-widget',
  standalone: true,
  imports: [WaitingOverlayComponent, PaginationNavigationComponent, MyFeesListComponent],
  templateUrl: './my-fees-list-widget.component.html'
})
export class MyFeesListWidgetComponent implements OnInit {

  public page = new PaginatedResponse<Fee[]>([]);

  /**
   * Loading flag.
   */
  public readingFees = false;

  constructor(
    private service: MyFeesService
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
