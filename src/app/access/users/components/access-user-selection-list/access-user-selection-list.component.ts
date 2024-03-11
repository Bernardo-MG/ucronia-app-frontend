import { Component, OnInit } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { User } from '@app/core/authentication/models/user';
import { AccessUserService } from '../../services/access-user.service';

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
