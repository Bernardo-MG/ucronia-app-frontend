import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { UserToken } from '@app/core/authentication/models/user-token';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { PaginationRouteNavigationComponent } from '@app/shared/pagination/components/pagination-route-navigation/pagination-route-navigation.component';
import { UserTokenService } from '../../../services/user-token.service';

@Component({
  selector: 'access-user-token-selection-list',
  standalone: true,
  imports: [CommonModule, RouterModule, WaitingOverlayComponent, SortingButtonComponent, PaginationRouteNavigationComponent],
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

  public onChangeDirection(field: SortProperty) {
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
