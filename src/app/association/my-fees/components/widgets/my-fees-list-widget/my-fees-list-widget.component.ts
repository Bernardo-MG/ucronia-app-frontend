import { Component, OnInit } from '@angular/core';
import { Fee } from '@app/association/fees/shared/models/fee';
import { MyFeesService } from '@app/association/my-fees/services/my-fees.service';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationInfoWrapperComponent } from '@app/shared/layout/components/pagination-info-wrapper/pagination-info-wrapper.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { MyFeesListComponent } from '../../list/my-fees-list/my-fees-list.component';

@Component({
  selector: 'assoc-my-fees-list-widget',
  standalone: true,
  imports: [WaitingOverlayComponent, MyFeesListComponent, PaginationInfoWrapperComponent],
  templateUrl: './my-fees-list-widget.component.html'
})
export class MyFeesListWidgetComponent implements OnInit {

  public page = new PaginatedResponse<Fee[]>([]);

  /**
   * Loading flag.
   */
  public reading = false;

  constructor(
    private service: MyFeesService
  ) { }

  ngOnInit(): void {
    this.load(0);
  }

  public load(page: number) {
    this.reading = true;

    this.service.getAll(page).subscribe({
      next: response => {
        this.page = response;

        // Reactivate view
        this.reading = false;
      },
      error: error => {
        // Reactivate view
        this.reading = false;
      }
    });
  }

}
