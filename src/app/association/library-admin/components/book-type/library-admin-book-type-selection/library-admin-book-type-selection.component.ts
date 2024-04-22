import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookType } from '@app/association/library/models/book-type';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';

@Component({
  selector: 'assoc-library-admin-book-type-selection',
  standalone: true,
  imports: [ButtonListComponent, WaitingWrapperComponent, PaginationNavigationComponent],
  templateUrl: './library-admin-book-type-selection.component.html'
})
export class LibraryAdminBookTypeSelectionComponent {

  @Input() public waiting = false;

  @Input() public values: BookType[] = [];

  /**
   * Current page number. This is the pointer to move around the pagination.
   */
  @Input() public current = 1;

  /**
   * Total number of pages.
   */
  @Input() public pages = 0;

  @Output() public choose = new EventEmitter<BookType>();

  @Output() public goToPage = new EventEmitter<number>();

  @Output() public cancel = new EventEmitter<void>();

  public onPick(bookType: BookType) {
    this.choose.emit(bookType);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

  public onCancel() {
    this.cancel.emit();
  }

  public nameRenderer(bookType: BookType) {
    return bookType.name;
  }

}
