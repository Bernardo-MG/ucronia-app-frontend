import { Component, OnInit } from '@angular/core';
import { Pagination } from '@app/core/api/models/pagination';
import { Sort } from '@app/core/api/models/sort';
import { UserToken } from '@app/core/authentication/models/user-token';
import { UserTokenService } from '../../services/user-token.service';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';

@Component({
  selector: 'access-user-token-selection-list',
  templateUrl: './user-token-selection-list.component.html'
})
export class UserTokenSelectionListComponent implements OnInit {

  public response = new PaginatedResponse<UserToken[]>([]);

  /**
   * Loading flag.
   */
  public readingUsers = false;

  private sort: Sort[] = [];

  constructor(
    private service: UserTokenService
  ) { }

  ngOnInit(): void {
    this.load(undefined);
  }

  public onChangeDirection(sort: Sort) {
    const index = this.sort.findIndex(s => s.property === sort.property);
    if (index < 0) {
      // New property to sort
      this.sort.push(sort);
    } else {
      // Replace property
      this.sort[index] = sort;
    }
    this.load({ page: this.response.currentPage() });
  }

  private load(pagination: Pagination | undefined) {
    this.readingUsers = true;
    this.service.getAll(pagination, this.sort).subscribe({
      next: response => {
        this.response = response;

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
