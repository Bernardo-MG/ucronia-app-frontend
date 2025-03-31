import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookInfo } from '@app/models/library/book-info';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { ArticleComponent, CardBodyComponent, CardComponent, CardFooterComponent } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { LibraryBookListComponent } from '../../components/library-book-list/library-book-list.component';
import { BookService } from '../../services/book.service';

@Component({
    selector: 'assoc-library-game-listing',
    imports: [RouterModule, PaginationInfoComponent, LibraryBookListComponent, ArticleComponent, CardComponent, CardBodyComponent, CardFooterComponent],
    templateUrl: './library-game-listing.container.html'
})
export class LibraryGameListingContainer implements OnInit {

  public data = new PaginatedResponse<BookInfo>();

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sorting();

  constructor(
    private service: BookService
  ) { }

  public ngOnInit(): void {
    // Load books
    this.load(0)
  }

  public onChangeDirection(field: SortingProperty) {
    this.sort.addField(field);

    this.load(this.data.page);
  }

  public load(page: number) {
    this.reading = true;

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
  }

  public routeLinkAdapter(data: BookInfo): string {
    return `${data.number}`;
  }

}
