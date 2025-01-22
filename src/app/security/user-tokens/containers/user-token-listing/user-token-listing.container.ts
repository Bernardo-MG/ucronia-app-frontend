import { Component, OnInit } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { UserToken } from '@app/core/authentication/models/user-token';
import { UserTokenService } from '@app/security/user-tokens/services/user-token.service';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { UserTokenSelectionListComponent } from '../../components/user-token-selection-list/user-token-selection-list.component';
import { CardFooterComponent } from '@app/shared/card/components/card-footer/card-footer.component';

@Component({
    selector: 'access-user-token-listing',
    imports: [UserTokenSelectionListComponent, ArticleComponent, PaginationInfoComponent, CardComponent, CardBodyComponent, CardFooterComponent],
    templateUrl: './user-token-listing.container.html'
})
export class UserTokenListingContainer implements OnInit {

  public data = new PaginatedResponse<UserToken[]>([]);

  private sort = new Sort([]);

  /**
   * Loading flag.
   */
  public reading = false;

  constructor(
    private service: UserTokenService
  ) { }

  public ngOnInit(): void {
    this.load(0);
  }

  public onChangeDirection(field: SortProperty) {
    this.sort.addField(field);

    this.load(this.data.page);
  }

  public load(page: number) {
    this.reading = true;
    this.service.getAll(page, this.sort).subscribe({
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

  public routeLinkAdapter(data: UserToken): string {
    console.log(`Token: ${data.token}`);
    return `/security/user-tokens/${data.token}`;
  }

}
