import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { Publisher } from '../../models/publisher';

@Component({
  selector: 'app-library-publisher-selection',
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

  @Output() public select = new EventEmitter<Publisher>();

  @Output() public goToPage = new EventEmitter<number>();

  public onPick(gameSystem: Publisher) {
    this.select.emit(gameSystem);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

  public nameRenderer(gameSystem: Publisher) {
    return gameSystem.name;
  }

}
