import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookType } from '@app/models/library/book-type';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { ArticleComponent, BlockUiDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { BookTypeAdminService } from '../../services/book-type-admin.service';

@Component({
  selector: 'assoc-library-admin-book-type-listing',
  imports: [CommonModule, RouterModule, SortingButtonComponent, ArticleComponent, PaginationInfoComponent, IconAddComponent, CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent, BlockUiDirective],
  templateUrl: './library-admin-book-type-listing.container.html'
})
export class LibraryAdminBookTypeListingContainer {

  private authContainer = inject(AuthContainer);

  private service = inject(BookTypeAdminService);

  private _pageNumber = 0;

  @Input() public set pageNumber(value: number) {
    this._pageNumber = value;
    this.load(value);
  }

  public get pageNumber() {
    return this._pageNumber;
  }

  @Output() public wait = new EventEmitter<boolean>();

  @Output() public changePage = new EventEmitter<PaginatedResponse<any>>();

  public data = new PaginatedResponse<BookType>();

  /**
   * Loading flag.
   */
  public reading = false;

  public readonly createPermission;

  private sort = new Sorting();

  constructor() {
    // Load books
    this.load(0)
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("library_book_type", "create");
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

}
