import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book } from '@app/models/library/book';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { ArticleComponent, CardBodyComponent, CardComponent, CardFooterComponent } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { LibraryBookListComponent } from '../../components/library-book-list/library-book-list.component';
import { BookService } from '../../services/book.service';

@Component({
    selector: 'assoc-library-listing',
    imports: [RouterModule, PaginationInfoComponent, LibraryBookListComponent, ArticleComponent, CardComponent, CardBodyComponent, CardFooterComponent],
    templateUrl: './library-listing.container.html'
})
export class LibraryListingContainer implements OnInit {

  public adminPermission = false;

  public data = new PaginatedResponse<Book>();

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sorting();

  constructor(
    private service: BookService,
    private authContainer: AuthContainer
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.adminPermission = this.authContainer.hasPermission("library_admin", "view");
    // Load books
    this.load(0)
  }

  public onChangeDirection(field: SortingProperty) {
    this.sort.addField(field);

    this.load(this.data.page);
  }

  public load(page: number) {
    this.reading = true;

    this.service.getAll(page, this.sort).subscribe({
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

  public routeLinkAdapter(data: Book): string {
    return `${data.number}`;
  }

}
