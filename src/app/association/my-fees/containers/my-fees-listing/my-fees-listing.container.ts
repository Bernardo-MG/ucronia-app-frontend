
import { Component, inject } from '@angular/core';
import { Fee } from '@app/models/fees/fee';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { PaginatedResponse } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { MyFeesListComponent } from '../../components/list/my-fees-list/my-fees-list.component';
import { MyFeesService } from '../../services/my-fees.service';

@Component({
  selector: 'app-my-fees-listing',
  imports: [CardModule, MyFeesListComponent, PaginationInfoComponent],
  templateUrl: './my-fees-listing.container.html'
})
export class MyFeesFrontpageContainer {

  private readonly service = inject(MyFeesService);

  public data = new PaginatedResponse<Fee>();

  /**
   * Loading flag.
   */
  public reading = false;

  constructor() {
    this.load(0);
  }

  public load(page: number) {
    this.reading = true;

    this.service.getAll(page).subscribe({
      next: response => {
        this.data = response;

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
