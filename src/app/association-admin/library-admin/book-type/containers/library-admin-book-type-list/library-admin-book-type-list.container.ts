
import { Component, inject, Input, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BookType } from '@app/models/library/book-type';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { TableModule, TablePageEvent } from 'primeng/table';
import { BookTypeAdminService } from '../../services/book-type-admin.service';

@Component({
  selector: 'assoc-library-admin-book-type-list',
  imports: [CardModule, RouterModule, TableModule, IconAddComponent],
  templateUrl: './library-admin-book-type-list.container.html'
})
export class LibraryAdminBookTypeListContainer {

  private readonly router = inject(Router);

  private readonly service = inject(BookTypeAdminService);

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

  public data = new PaginatedResponse<BookType>();

  public selectedBookType = new BookType();

  /**
   * Loading flag.
   */
  public loading = false;

  public readonly createPermission;

  private sort = new Sorting();

  constructor() {
    const authContainer = inject(AuthContainer);

    // Load books
    this.load(0)
    // Check permissions
    this.createPermission = authContainer.hasPermission("library_book_type", "create");
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

  public onSelectBookType() {
    this.router.navigate([`/association/admin/library/booktypes/${this.selectedBookType.number}`]);
  }

  private load(page: number) {
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
