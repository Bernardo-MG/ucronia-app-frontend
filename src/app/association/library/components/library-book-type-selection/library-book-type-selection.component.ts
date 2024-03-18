import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '@app/association/members/models/member';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { BookType } from '../../models/book-type';

@Component({
  selector: 'assoc-library-book-type-selection',
  standalone: true,
  imports: [LayoutModule, PaginationModule],
  templateUrl: './library-book-type-selection.component.html',
  styleUrl: './library-book-type-selection.component.sass'
})
export class LibraryBookTypeSelectionComponent {

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

  @Output() public select = new EventEmitter<BookType>();

  @Output() public goToPage = new EventEmitter<number>();

  public onPick(bookType: BookType) {
    this.select.emit(bookType);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

  public nameRenderer(bookType: BookType) {
    return bookType.name;
  }

}