import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookReportWidgetContainer } from '@app/association-admin/library-admin/report/containers/book-report-widget/book-report-widget.container';
import { BookInfo } from '@app/models/library/book-info';
import { GameBook } from '@app/models/library/game-book';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { AuthContainer } from '@bernardo-mg/authentication';
import { IconAddComponent } from '@bernardo-mg/icons';
import { ArticleComponent, BlockUiDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { LibraryAdminBookListComponent } from '../../../shared/components/library-admin-book-list/library-admin-book-list.component';
import { GameAdminService } from '../../services/book-admin.service';

@Component({
  selector: 'assoc-library-admin-book-listing',
  imports: [CommonModule, RouterModule, LibraryAdminBookListComponent, ArticleComponent, PaginationInfoComponent, IconAddComponent, BookReportWidgetContainer, CardComponent, CardBodyComponent, CardHeaderComponent, CardFooterComponent, BlockUiDirective],
  templateUrl: './library-admin-book-listing.container.html'
})
export class LibraryAdminBookListingContainer {

  private readonly service = inject(GameAdminService);

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

  public data = new PaginatedResponse<GameBook>();

  public source: 'games' | 'fiction' = 'games';

  /**
   * Loading flag.
   */
  public reading = false;

  public readonly createPermission;

  private sort = new Sorting();

  constructor(
    authContainer: AuthContainer
  ) {
    // Load books
    this.load(0);
    // Check permissions
    this.createPermission = authContainer.hasPermission("library_book", "create");
  }

  public onChangeDirection(field: SortingProperty) {
    this.sort.addField(field);

    this.load(this.pageNumber);
  }

  public onChangeSource(event: any) {
    this.source = event.target.value as 'games' | 'fiction';
    this.load(0);
  }

  public load(page: number) {
    this.reading = true;
    this.wait.emit(this.reading);


    if (this.source === 'games') {
      this.service.getAllGameBooks(page, this.sort).subscribe({
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
    } else {
      this.service.getAllFictionBooks(page, this.sort).subscribe({
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

  public routeLinkAdapter = (data: BookInfo): string => {
    return `${this.source}/${data.number}`;
  }

}
