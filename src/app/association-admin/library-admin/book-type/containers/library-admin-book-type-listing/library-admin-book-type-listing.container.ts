import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookType } from '@app/models/library/book-type';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { BlockUiDirective } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { BookTypeAdminService } from '../../services/book-type-admin.service';

@Component({
    selector: 'assoc-library-admin-book-type-listing',
    imports: [CommonModule, RouterModule, SortingButtonComponent, BlockUiDirective],
    templateUrl: './library-admin-book-type-listing.container.html'
})
export class LibraryAdminBookTypeListingContainer implements OnInit, OnChanges {

  @Input() public pageNumber = 0;

  @Output() public wait = new EventEmitter<boolean>();

  @Output() public changePage = new EventEmitter<PaginatedResponse<any[]>>();

  public data: BookType[] = [];

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sorting([]);

  constructor(
    private service: BookTypeAdminService
  ) { }

  public ngOnInit(): void {
    // Load books
    this.load(0)
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

}
