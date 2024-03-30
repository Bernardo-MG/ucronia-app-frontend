import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { UserToken } from '@app/core/authentication/models/user-token';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationOrderButtonComponent } from '@app/shared/pagination/components/pagination-order-button/pagination-order-button.component';
import { PaginationRouteNavigationComponent } from '@app/shared/pagination/components/pagination-route-navigation/pagination-route-navigation.component';
import { UserTokenService } from '../../services/user-token.service';

@Component({
  selector: 'access-user-token-selection-list',
  standalone: true,
  imports: [CommonModule, RouterModule, WaitingWrapperComponent, PaginationOrderButtonComponent, PaginationRouteNavigationComponent],
  templateUrl: './user-token-selection-list.component.html'
})
export class UserTokenSelectionListComponent implements OnInit {

  public page = new PaginatedResponse<UserToken[]>([]);

  /**
   * Loading flag.
   */
  public readingUsers = false;

  private sort = new Sort([]);

  constructor(
    private service: UserTokenService
  ) { }

  ngOnInit(): void {
    this.load(0);
  }

  public onChangeDirection(field: SortField) {
    this.sort.addField(field);

    // We are working with pages using index 0
    // TODO: the pages should come with the correct index
    this.load(this.page.page + 1);
  }

  private load(page: number) {
    this.readingUsers = true;
    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.page = response;

        // Reactivate view
        this.readingUsers = false;
      },
      error: error => {
        // Reactivate view
        this.readingUsers = false;
      }
    });
  }

}
