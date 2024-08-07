import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { Book } from '../../../models/book';
import { BookService } from '../../../services/book.service';
import { LibraryBookListComponent } from '../library-book-list/library-book-list.component';

@Component({
  selector: 'assoc-library-book-list-widget',
  standalone: true,
  imports: [CommonModule, RouterModule, WaitingOverlayComponent, PaginationNavigationComponent, LibraryBookListComponent],
  templateUrl: './library-book-list-widget.component.html'
})
export class LibraryBookListWidgetComponent implements OnInit {

  public page = new PaginatedResponse<Book[]>([]);

  /**
   * Loading flag.
   */
  public readingBooks = false;

  private sort = new Sort([]);

  constructor(
    private service: BookService
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

  public onGoTo(page: number) {
    this.load(page);
  }

  private load(page: number) {
    this.readingBooks = true;

    this.service.getAll(page).subscribe({
      next: response => {
        this.page = response;

        // Reactivate view
        this.readingBooks = false;
      },
      error: error => {
        // Reactivate view
        this.readingBooks = false;
      }
    });
  }

}
