import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class LibraryAdminLendingListingContainer implements OnInit, OnChanges {

  private authContainer = inject(AuthContainer);

  private service = inject(BookLendingService);

  @Input() public pageNumber = 0;

  @Output() public wait = new EventEmitter<boolean>();

  @Output() public changePage = new EventEmitter<PaginatedResponse<any>>();

  public data = new PaginatedResponse<BookLending>();

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

}
