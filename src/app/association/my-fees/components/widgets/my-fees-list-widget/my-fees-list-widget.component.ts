import { Component, OnInit } from '@angular/core';
import { Fee } from '@app/association-admin/fees/shared/models/fee';
import { MyFeesService } from '@app/association/my-fees/services/my-fees.service';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { CardModule } from '@app/shared/card/card.module';
import { PaginationInfoWrapperComponent } from '@app/shared/layout/components/pagination-info-wrapper/pagination-info-wrapper.component';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { MyFeesListComponent } from '../../list/my-fees-list/my-fees-list.component';

@Component({
  selector: 'assoc-my-fees-list-widget',
  standalone: true,
  imports: [CardModule, MyFeesListComponent, PaginationInfoWrapperComponent, BlockUiDirective],
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
