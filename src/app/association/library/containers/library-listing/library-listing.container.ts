import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Book } from '@app/models/library/book';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { ArticleComponent, CardBodyComponent, CardComponent, CardFooterComponent } from '@bernardo-mg/layout';
import { PaginatedResponse, Sort, SortProperty } from '@bernardo-mg/request';
import { LibraryBookListComponent } from '../../components/library-book-list/library-book-list.component';
import { BookService } from '../../services/book.service';

@Component({
    selector: 'assoc-library-listing',
    imports: [RouterModule, PaginationInfoComponent, LibraryBookListComponent, ArticleComponent, CardComponent, CardBodyComponent, CardFooterComponent],
    templateUrl: './library-listing.container.html'
})
export class LibraryListingContainer implements OnInit {

  public adminPermission = false;

  public data = new PaginatedResponse<Book[]>([]);

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sort([]);

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

  public onChangeDirection(field: SortProperty) {
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
