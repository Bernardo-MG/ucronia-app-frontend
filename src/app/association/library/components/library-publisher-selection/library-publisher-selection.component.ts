import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { Publisher } from '../../models/publisher';

@Component({
  selector: 'assoc-library-publisher-selection',
  standalone: true,
  imports: [LayoutModule, PaginationModule],
  templateUrl: './library-publisher-selection.component.html'
})
export class LibraryPublisherSelectionComponent {

  @Input() public waiting = false;

  @Input() public values: Publisher[] = [];

  /**
   * Current page number. This is the pointer to move around the pagination.
   */
  @Input() public current = 1;

  /**
   * Total number of pages.
   */
  @Input() public pages = 0;

  @Output() public choose = new EventEmitter<Publisher>();

  @Output() public goToPage = new EventEmitter<number>();

  @Output() public cancel = new EventEmitter<void>();

  public onPick(gameSystem: Publisher) {
    this.choose.emit(gameSystem);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

  public onCancel() {
    this.cancel.emit();
  }

  public nameRenderer(gameSystem: Publisher) {
    return gameSystem.name;
  }

}
