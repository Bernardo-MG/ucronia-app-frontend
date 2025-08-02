import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BookInfo } from '@app/models/library/book-info';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { TableModule, TablePageEvent } from 'primeng/table';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'assoc-library-list',
  imports: [RouterModule, CardModule, TableModule],
  templateUrl: './library-list.container.html'
})
export class LibraryListingContainer {

  private readonly router = inject(Router);

  private readonly service = inject(BookService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<BookInfo>();

  public selectedBook = new BookInfo();

  /**
   * Loading flag.
   */
  public loading = false;

  public source: 'games' | 'fiction' = 'games';

  private sort = new Sorting();

  constructor() {
    // Load books
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


  public onChangeSource(event: any) {
    this.source = event.target.value as 'games' | 'fiction';
    this.load(0);
  }

  public load(page: number) {
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

  public routeLinkAdapter = (data: BookInfo): string => {
    return `${this.source}/${data.number}`;
  };

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onSelectBook() {
    this.router.navigate([`/association/library/${this.source}/${this.selectedBook.number}`]);
  }

}
