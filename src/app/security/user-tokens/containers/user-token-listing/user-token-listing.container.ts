import { Component, OnInit } from '@angular/core';
import { UserToken } from '../../../../../../projects/bernardo-mg/authentication/src/lib/models/user-token';
import { UserTokenService } from '@app/security/user-tokens/services/user-token.service';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { ArticleComponent, CardBodyComponent, CardComponent, CardFooterComponent } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { UserTokenSelectionListComponent } from '../../components/user-token-selection-list/user-token-selection-list.component';

@Component({
    selector: 'access-user-token-listing',
    imports: [UserTokenSelectionListComponent, ArticleComponent, PaginationInfoComponent, CardComponent, CardBodyComponent, CardFooterComponent],
    templateUrl: './user-token-listing.container.html'
})
export class UserTokenListingContainer implements OnInit {

  public data = new PaginatedResponse<UserToken>();

  private sort = new Sorting();

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
