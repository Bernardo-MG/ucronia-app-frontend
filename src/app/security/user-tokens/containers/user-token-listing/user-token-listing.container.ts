import { Component, inject } from '@angular/core';
import { UserTokenService } from '@app/security/user-tokens/services/user-token.service';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { UserToken } from '@bernardo-mg/authentication';
import { ArticleComponent, CardBodyComponent, CardComponent, CardFooterComponent } from '@bernardo-mg/ui';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { UserTokenSelectionListComponent } from '../../components/user-token-selection-list/user-token-selection-list.component';

@Component({
  selector: 'access-user-token-listing',
  imports: [UserTokenSelectionListComponent, ArticleComponent, PaginationInfoComponent, CardComponent, CardBodyComponent, CardFooterComponent],
  templateUrl: './user-token-listing.container.html'
})
export class UserTokenListingContainer {

  private readonly service = inject(UserTokenService);

  public data = new PaginatedResponse<UserToken>();

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public reading = false;

  constructor() {
    this.load(0);
  }

  public onChangeDirection(field: SortingProperty) {
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
