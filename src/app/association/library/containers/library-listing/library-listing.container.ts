import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookInfo } from '@app/models/library/book-info';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { ArticleComponent, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent } from '@bernardo-mg/ui';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { LibraryBookListComponent } from '../../components/library-book-list/library-book-list.component';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'assoc-library-listing',
  imports: [RouterModule, PaginationInfoComponent, LibraryBookListComponent, ArticleComponent, CardComponent, CardHeaderComponent, CardBodyComponent, CardFooterComponent],
  templateUrl: './library-listing.container.html'
})
export class LibraryListingContainer {

  private readonly service = inject(BookService);

  public data = new PaginatedResponse<BookInfo>();

  /**
   * Loading flag.
   */
  public reading = false;

  public source: 'games' | 'fiction' = 'games';

  private sort = new Sorting();

  constructor() {
    // Load books
    this.load(0);
  }

  public onChangeDirection(field: SortingProperty) {
    this.sort.addField(field);

    this.load(this.data.page);
  }

  public onChangeSource(event: any) {
    this.source = event.target.value as 'games' | 'fiction';
    this.load(0);
  }

  public load(page: number) {
    this.reading = true;

    if (this.source === 'games') {
      this.service.getAllGameBooks(page, this.sort).subscribe({
        next: response => {
          this.data = response;

          // Reactivate view
          this.reading = false;
        },
        error: error => {
          // Reactivate view
          this.reading = false;
        }
      });
    } else {
      this.service.getAllFictionBooks(page, this.sort).subscribe({
        next: response => {
          this.data = response;

          // Reactivate view
          this.reading = false;
        },
        error: error => {
          // Reactivate view
          this.reading = false;
        }
      });
    }
  }

  public routeLinkAdapter = (data: BookInfo): string => {
    return `${this.source}/${data.number}`;
  };

}
