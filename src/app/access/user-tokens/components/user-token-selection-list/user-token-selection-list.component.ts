import { Component, OnInit } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { UserToken } from '@app/core/authentication/models/user-token';
import { UserTokenService } from '../../services/user-token.service';

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
    this.load(0);
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
    this.load(this.response.currentPage());
  }

  private load(page: number) {
    this.readingUsers = true;
    this.service.getAll(page, this.sort).subscribe({
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
