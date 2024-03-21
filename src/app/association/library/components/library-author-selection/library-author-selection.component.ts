import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { Author } from '../../models/author';

@Component({
  selector: 'assoc-library-author-selection',
  standalone: true,
  imports: [LayoutModule, PaginationModule],
  templateUrl: './library-author-selection.component.html'
})
export class LibraryAuthorSelectionComponent {

  @Input() public waiting = false;

  @Input() public values: Author[] = [];

  /**
   * Current page number. This is the pointer to move around the pagination.
   */
  @Input() public current = 1;

  /**
   * Total number of pages.
   */
  @Input() public pages = 0;

  @Output() public select = new EventEmitter<Author>();

  @Output() public goToPage = new EventEmitter<number>();

  @Output() public cancel = new EventEmitter<void>();

  public onPick(gameSystem: Author) {
    this.select.emit(gameSystem);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

  public onCancel() {
    this.cancel.emit();
  }

  public nameRenderer(gameSystem: Author) {
    return gameSystem.name;
  }

}
