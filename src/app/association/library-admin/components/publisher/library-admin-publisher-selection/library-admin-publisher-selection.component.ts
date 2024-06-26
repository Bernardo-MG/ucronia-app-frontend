import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Publisher } from '@app/association/library/models/publisher';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';

@Component({
  selector: 'assoc-library-admin-publisher-selection',
  standalone: true,
  imports: [ButtonListComponent, WaitingOverlayComponent, PaginationNavigationComponent],
  templateUrl: './library-admin-publisher-selection.component.html'
})
export class LibraryAdminPublisherSelectionComponent {

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

  public onPick(gameSystem: Publisher) {
    this.choose.emit(gameSystem);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

  public nameRenderer(gameSystem: Publisher) {
    return gameSystem.name;
  }

}
