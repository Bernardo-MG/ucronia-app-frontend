import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookReportWidgetContainer } from '@app/association-admin/library-admin/report/containers/book-report-widget/book-report-widget.container';
import { Book } from '@app/models/library/book';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { ArticleComponent, BlockUiDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { LibraryAdminBookListComponent } from '../../../shared/components/library-admin-book-list/library-admin-book-list.component';
import { FictionBookAdminService } from '../../services/fiction-book-admin.service';

@Component({
  selector: 'assoc-library-admin-fiction-book-listing',
  imports: [CommonModule, RouterModule, LibraryAdminBookListComponent, ArticleComponent, PaginationInfoComponent, IconAddComponent, BookReportWidgetContainer, CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent, BlockUiDirective],
  templateUrl: './library-admin-fiction-book-listing.container.html'
})
export class LibraryAdminFictionBookListingContainer implements OnInit, OnChanges {

  private authContainer = inject(AuthContainer);

  private service = inject(FictionBookAdminService);

  @Input() public pageNumber = 0;

  @Output() public wait = new EventEmitter<boolean>();

  @Output() public changePage = new EventEmitter<PaginatedResponse<any>>();

  public data = new PaginatedResponse<Book>();

  /**
   * Loading flag.
   */
  public reading = false;

  public createPermission = false;

  private sort = new Sorting();

  public ngOnInit(): void {
    // Load books
    this.load(this.pageNumber);
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("library_book", "create");
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageNumber']) {
      this.load(this.pageNumber);
    }
  }

  public onChangeDirection(field: SortingProperty) {
    this.sort.addField(field);

    this.load(this.pageNumber);
  }

  public load(page: number) {
    this.reading = true;
    this.wait.emit(this.reading);

    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.data = response;
        this.changePage.emit(response);

        // Reactivate view
        this.reading = false;
        this.wait.emit(this.reading);
      },
      error: error => {
        // Reactivate view
        this.reading = false;
        this.wait.emit(this.reading);
      }
    });
  }

  public routeLinkAdapter(data: Book): string {
    return `${data.number}`;
  }

}
