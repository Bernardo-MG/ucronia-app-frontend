import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book } from '@app/models/library/book';
import { BlockUiDirective } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { LibraryAdminBookListComponent } from '../../components/library-admin-book-list/library-admin-book-list.component';
import { BookAdminService } from '../../services/book-admin.service';

@Component({
    selector: 'assoc-library-admin-book-listing',
    imports: [CommonModule, RouterModule, LibraryAdminBookListComponent, BlockUiDirective],
    templateUrl: './library-admin-book-listing.container.html'
})
export class LibraryAdminBookListingContainer implements OnInit, OnChanges {

  @Input() public pageNumber = 0;

  @Output() public wait = new EventEmitter<boolean>();

  @Output() public changePage = new EventEmitter<PaginatedResponse<any[]>>();

  public data: Book[] = [];

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sorting([]);

  constructor(
    private service: BookAdminService
  ) { }

  public ngOnInit(): void {
    // Load books
    this.load(this.pageNumber);
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
        this.data = response.content;
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
    return `book/${data.number}`;
  }

}
