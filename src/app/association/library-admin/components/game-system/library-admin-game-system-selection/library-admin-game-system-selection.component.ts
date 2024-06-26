import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameSystem } from '@app/association/library/models/game-system';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';

@Component({
  selector: 'assoc-library-admin-game-system-selection',
  standalone: true,
  imports: [WaitingOverlayComponent, ButtonListComponent, PaginationNavigationComponent],
  templateUrl: './library-admin-game-system-selection.component.html'
})
export class LibraryAdminGameSystemSelectionComponent {

  @Input() public waiting = false;

  @Input() public values: GameSystem[] = [];

  /**
   * Current page number. This is the pointer to move around the pagination.
   */
  @Input() public current = 1;

  /**
   * Total number of pages.
   */
  @Input() public pages = 0;

  @Output() public choose = new EventEmitter<GameSystem>();

  @Output() public goToPage = new EventEmitter<number>();

  public onPick(gameSystem: GameSystem) {
    this.choose.emit(gameSystem);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

  public nameRenderer(gameSystem: GameSystem) {
    return gameSystem.name;
  }

}
