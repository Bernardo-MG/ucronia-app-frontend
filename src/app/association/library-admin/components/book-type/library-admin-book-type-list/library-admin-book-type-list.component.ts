import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookTypeAdminService } from '@app/association/library-admin/services/book-type-admin.service';
import { BookType } from '@app/association/library/models/book-type';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationInfoComponent } from '@app/shared/pagination/components/pagination-navigation-info/pagination-navigation-info.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';

@Component({
  selector: 'assoc-library-admin-book-type-list',
  standalone: true,
  imports: [CommonModule, RouterModule, WaitingOverlayComponent, SortingButtonComponent, PaginationNavigationInfoComponent],
  templateUrl: './library-admin-book-type-list.component.html'
})
export class LibraryAdminBookTypeListComponent implements OnInit {

  public page = new PaginatedResponse<BookType[]>([]);

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sort([]);

  constructor(
    private service: BookTypeAdminService
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

    this.service.getAll(page).subscribe({
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

}
