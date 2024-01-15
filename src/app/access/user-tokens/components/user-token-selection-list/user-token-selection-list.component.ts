import { Component, OnInit } from '@angular/core';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { UserToken } from '@app/core/authentication/models/user-token';
import { UserTokenService } from '../../services/user-token.service';

@Component({
  selector: 'access-user-token-selection-list',
  templateUrl: './user-token-selection-list.component.html'
})
export class UserTokenSelectionListComponent implements OnInit {

  /**
   * Loading flag.
   */
  public readingUsers = false;

  public tokens: UserToken[] = [];

  public totalPages = 0;

  public currentPage = 0;

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
    this.load({ page: this.currentPage, sort: this.sort });
  }

  private load(pagination: PaginationRequest | undefined) {
    this.readingUsers = true;
    this.service.getAll(pagination).subscribe({
      next: page => {
        this.tokens = page.content;

        this.totalPages = page.totalPages;
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
