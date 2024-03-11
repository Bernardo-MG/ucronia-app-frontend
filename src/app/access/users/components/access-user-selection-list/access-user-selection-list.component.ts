import { Component, OnInit } from '@angular/core';
import { Pagination } from '@app/core/api/models/pagination';
import { Sort } from '@app/core/api/models/sort';
import { User } from '@app/core/authentication/models/user';
import { AccessUserService } from '../../services/access-user.service';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';

@Component({
  selector: 'access-user-selection-list',
  templateUrl: './access-user-selection-list.component.html'
})
export class AccessUserSelectionListComponent implements OnInit {

  public response = new PaginatedResponse<User[]>([]);

  /**
   * Loading flag.
   */
  public readingUsers = false;

  private sort: Sort[] = [];

  constructor(
    private service: AccessUserService
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
