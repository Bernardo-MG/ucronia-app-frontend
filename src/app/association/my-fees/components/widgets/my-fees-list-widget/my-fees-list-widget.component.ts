import { Component, OnInit } from '@angular/core';
import { MyFeesService } from '@app/association/my-fees/services/my-fees.service';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Fee } from '@app/models/fees/fee';
import { CardModule } from '@app/shared/card/card.module';
import { PaginationInfoComponent } from '@app/shared/layout/components/pagination-info/pagination-info.component';
import { MyFeesListComponent } from '../../list/my-fees-list/my-fees-list.component';

@Component({
  selector: 'assoc-my-fees-list-widget',
  standalone: true,
  imports: [CardModule, MyFeesListComponent, PaginationInfoComponent],
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
