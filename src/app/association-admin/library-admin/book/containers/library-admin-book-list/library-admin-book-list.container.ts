
import { Component, inject, Input, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BookReportWidgetContainer } from '@app/association-admin/library-admin/report/containers/book-report-widget/book-report-widget.container';
import { BookInfo } from '@app/models/library/book-info';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { TableModule, TablePageEvent } from 'primeng/table';
import { BookAdminService } from '../../services/book-admin.service';

@Component({
  selector: 'assoc-library-admin-book-list',
  imports: [CardModule, RouterModule, TableModule, IconAddComponent, BookReportWidgetContainer],
  templateUrl: './library-admin-book-list.container.html'
})
export class LibraryAdminBookListContainer {

  private readonly router = inject(Router);

  private readonly service = inject(BookAdminService);

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

  public selectedData = new BookInfo();

  public data = new PaginatedResponse<BookInfo>();

  public source: 'games' | 'fiction' = 'games';

  /**
   * Loading flag.
   */
  public loading = false;

  public readonly createPermission;

  public get routerLink(): string {
    return `${this.source}/register`;
  }

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

  public onChangeSource(event: any) {
    this.source = event.target.value as 'games' | 'fiction';
    this.load(0);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onSelectRow() {
    this.router.navigate([`/association/admin/library/books/${this.source}/${this.selectedData.number}`]);
  }

  private load(page: number) {
    this.loading = true;

    if (this.source === 'games') {
      this.service.getAllGameBooks(page, this.sort).subscribe({
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
    } else {
      this.service.getAllFictionBooks(page, this.sort).subscribe({
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

}
