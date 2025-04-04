import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookLending } from '@app/models/library/book-lending';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { ArticleComponent, BlockUiDirective, CardBodyComponent, CardComponent, CardFooterComponent } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { AssocLibraryAdminLendingListComponent } from '../../components/assoc-library-admin-lending-list/assoc-library-admin-lending-list.component';
import { BookLendingService } from '../../services/book-lending.service';

@Component({
  selector: 'app-library-admin-lending-listing',
  imports: [CommonModule, RouterModule, AssocLibraryAdminLendingListComponent, ArticleComponent, PaginationInfoComponent, CardComponent, CardBodyComponent, CardFooterComponent, BlockUiDirective],
  templateUrl: './library-admin-lending-listing.container.html'
})
export class LibraryAdminLendingListingContainer {

  private authContainer = inject(AuthContainer);

  private service = inject(BookLendingService);

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

  public data = new PaginatedResponse<BookLending>();

  /**
   * Loading flag.
   */
  public reading = false;

  public readonly createPermission;

  private sort = new Sorting();

  constructor() {
    // Load books
    this.load(this.pageNumber);
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("library_book", "create");
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
