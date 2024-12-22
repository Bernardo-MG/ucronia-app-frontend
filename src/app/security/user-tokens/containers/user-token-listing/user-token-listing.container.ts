import { Component, OnInit } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { UserToken } from '@app/core/authentication/models/user-token';
import { UserTokenService } from '@app/security/user-tokens/services/user-token.service';
import { CardModule } from '@app/shared/card/card.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { PaginationInfoComponent } from '@app/shared/layout/components/pagination-info/pagination-info.component';
import { UserTokenSelectionListComponent } from '../../components/data/user-token-selection-list/user-token-selection-list.component';

@Component({
  selector: 'access-user-token-listing',
  standalone: true,
  imports: [CardModule, UserTokenSelectionListComponent, ArticleComponent, PaginationInfoComponent],
  templateUrl: './user-token-listing.container.html'
})
export class UserTokenListingContainer implements OnInit {

  public page = new PaginatedResponse<UserToken[]>([]);

  private sort = new Sort([]);

  /**
   * Loading flag.
   */
  public reading = false;

  constructor(
    private service: UserTokenService
  ) { }

  ngOnInit(): void {
    this.load(0);
  }

  public onChangeDirection(field: SortProperty) {
    this.sort.addField(field);

    // We are working with pages using index 0
    // TODO: the pages should come with the correct index
    this.load(this.page.page + 1);
  }

  public load(page: number) {
    this.reading = true;
    this.service.getAll(page, this.sort).subscribe({
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

  public routeLinkAdapter(data: UserToken): string {
    console.log(`Token: ${data.token}`);
    return `/security/user-tokens/${data.token}`;
  }

}
