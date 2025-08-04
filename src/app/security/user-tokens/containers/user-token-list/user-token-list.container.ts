
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserTokenService } from '@app/security/user-tokens/services/user-token.service';
import { UserToken } from '@bernardo-mg/authentication';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'access-user-token-list',
  imports: [CardModule, TableModule],
  templateUrl: './user-token-list.container.html'
})
export class UserTokenListingContainer {

  private readonly router = inject(Router);

  private readonly service = inject(UserTokenService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<UserToken>();

  public selectedData = new UserToken();

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public loading = false;

  constructor() {
    this.load(0);
  }

  public onChangeDirection(sorting: { field: string, order: number }) {
    let direction;
    if (sorting.order == 1) {
      direction = SortingDirection.Ascending;
    } else {
      direction = SortingDirection.Descending;
    }
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onSelectRow() {
    this.router.navigate([`/security/user-tokens/${this.selectedData.token}`]);
  }

  public load(page: number) {
    this.loading = true;
    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.data = response;

        // Reactivate view
        this.loading = false;
      },
      error: error => {
        // Reactivate view
        this.loading = false;
      }
    });
  }

}
