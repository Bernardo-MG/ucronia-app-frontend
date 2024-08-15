import { Component, OnInit } from '@angular/core';
import { UserTokenService } from '@app/security/user-tokens/services/user-token.service';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationInfoComponent } from '@app/shared/pagination/components/pagination-navigation-info/pagination-navigation-info.component';
import { UserTokenSelectionListComponent } from '../../data/user-token-selection-list/user-token-selection-list.component';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { UserToken } from '@app/core/authentication/models/user-token';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';

@Component({
  selector: 'access-user-token-frontpage',
  standalone: true,
  imports: [UserTokenSelectionListComponent, ArticleComponent, WaitingOverlayComponent, PaginationNavigationInfoComponent],
  templateUrl: './user-token-frontpage.component.html'
})
export class UserTokenFrontpageComponent implements OnInit {

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

}
