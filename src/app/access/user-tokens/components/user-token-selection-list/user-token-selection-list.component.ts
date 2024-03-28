import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { UserToken } from '@app/core/authentication/models/user-token';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { UserTokenService } from '../../services/user-token.service';

@Component({
  selector: 'access-user-token-selection-list',
  standalone: true,
  imports: [RouterModule, LayoutModule, PaginationModule],
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
