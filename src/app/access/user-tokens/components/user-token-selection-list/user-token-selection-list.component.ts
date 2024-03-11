import { Component, OnInit } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SortField } from '@app/core/api/models/sort-field';
import { UserToken } from '@app/core/authentication/models/user-token';
import { UserTokenService } from '../../services/user-token.service';
import { Sort } from '@app/core/api/models/sort';

@Component({
  selector: 'access-user-token-selection-list',
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

    this.load(this.page.currentPage);
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
