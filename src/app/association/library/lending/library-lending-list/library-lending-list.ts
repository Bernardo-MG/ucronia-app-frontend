
import { DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookLending } from '@app/domain/library/book-lending';
import { AuthContainer } from '@bernardo-mg/authentication';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { TableModule, TablePageEvent } from 'primeng/table';
import { LibraryLendingService } from '../library-lending-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-library-admin-lending-list',
  imports: [CardModule, RouterModule, TableModule, DatePipe],
  templateUrl: './library-lending-list.html'
})
export class LibraryLendingList {

  private readonly service = inject(LibraryLendingService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  private _pageNumber = 0;

  @Input() public set pageNumber(value: number) {
    this._pageNumber = value;
    this.load(value);
  }

  public get pageNumber() {
    return this._pageNumber;
  }

  public data = new PaginatedResponse<BookLending>();

  /**
   * Loading flag.
   */
  public loading = false;

  public readonly createPermission;

  private sort = new Sorting();

  constructor() {
    const authContainer = inject(AuthContainer);

    // Load books
    this.load(0);
    // Check permissions
    this.createPermission = authContainer.hasPermission("library_book", "create");
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

  private load(page: number) {
    this.loading = true;

    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}
