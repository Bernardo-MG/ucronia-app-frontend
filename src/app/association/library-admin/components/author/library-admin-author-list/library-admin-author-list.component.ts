import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Author } from '@app/association/library/models/author';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationInfoComponent } from '@app/shared/pagination/components/pagination-navigation-info/pagination-navigation-info.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { AuthorAdminService } from '../../../services/author-admin.service';

@Component({
  selector: 'assoc-library-admin-author-list',
  standalone: true,
  imports: [CommonModule, RouterModule, WaitingOverlayComponent, SortingButtonComponent, PaginationNavigationInfoComponent],
  templateUrl: './library-admin-author-list.component.html'
})
export class LibraryAdminAuthorListComponent implements OnInit {

  public page = new PaginatedResponse<Author[]>([]);

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sort([]);

  constructor(
    private service: AuthorAdminService
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
