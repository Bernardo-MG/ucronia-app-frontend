
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BookType } from '@app/domain/library/book-type';
import { AuthContainer } from '@bernardo-mg/authentication';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { BookTypeAdminService } from '../../services/book-type-admin.service';

@Component({
  selector: 'assoc-library-admin-book-type-list',
  imports: [CardModule, RouterModule, TableModule, PanelModule, MenuModule, ButtonModule],
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

  public selectedData = new BookType();

  /**
   * Loading flag.
   */
  public loading = false;

  public readonly editable;

  public readonly createable;

  private sort = new Sorting();

  constructor() {
    const authContainer = inject(AuthContainer);

    // Load books
    this.load(0)
    // Check permissions
    this.createable = authContainer.hasPermission("library_book_type", "create");
    this.editable = authContainer.hasPermission("library_book_type", "update");
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

  public onEdit(number: number) {
    this.router.navigate([`/association/admin/library/types/${number}`]);
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
