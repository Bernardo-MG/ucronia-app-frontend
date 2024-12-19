import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { Book } from '@app/models/library/book';
import { PaginationInfoWrapperComponent } from '@app/shared/layout/components/pagination-info-wrapper/pagination-info-wrapper.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { LibraryAdminBookListComponent } from '../../components/library-admin-book-list/library-admin-book-list.component';
import { BookAdminService } from '../../services/book-admin.service';

@Component({
  selector: 'assoc-library-admin-book-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, SortingButtonComponent, LibraryAdminBookListComponent, PaginationInfoWrapperComponent],
  templateUrl: './library-admin-book-listing.container.html'
})
export class LibraryAdminBookListingContainer implements OnInit {

  public page = new PaginatedResponse<Book[]>([]);

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sort([]);

  constructor(
    private service: BookAdminService
  ) { }

  public ngOnInit(): void {
    // Load books
    this.load(0)
  }

  public onChangeDirection(field: SortProperty) {
    this.sort.addField(field);

    // We are working with pages using index 0
    // TODO: the pages should come with the correct index
    this.load(this.page.page + 1);
  }

  public load(page: number) {
    this.reading = true;

    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.page = response;

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
    return `book/${data.number}`;
  }

}
