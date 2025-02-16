import { Component, OnInit } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Fee } from '@app/models/fees/fee';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardFooterComponent } from '@app/shared/card/components/card-footer/card-footer.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { ArticleComponent } from '@bernardo-mg/layout';
import { MyFeesListComponent } from '../../components/list/my-fees-list/my-fees-list.component';
import { MyFeesService } from '../../services/my-fees.service';

@Component({
    selector: 'app-my-fees-listing',
    imports: [ArticleComponent, MyFeesListComponent, PaginationInfoComponent, CardComponent, CardBodyComponent, CardFooterComponent],
    templateUrl: './my-fees-listing.container.html'
})
export class MyFeesFrontpageContainer implements OnInit {

  public data = new PaginatedResponse<Fee[]>([]);

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
