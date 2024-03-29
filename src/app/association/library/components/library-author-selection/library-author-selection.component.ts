import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { Author } from '../../models/author';

@Component({
  selector: 'assoc-library-author-selection',
  standalone: true,
  imports: [PaginationModule, ButtonListComponent, WaitingWrapperComponent],
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

  @Output() public choose = new EventEmitter<Author>();

  @Output() public goToPage = new EventEmitter<number>();

  @Output() public cancel = new EventEmitter<void>();

  public onPick(gameSystem: Author) {
    this.choose.emit(gameSystem);
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
