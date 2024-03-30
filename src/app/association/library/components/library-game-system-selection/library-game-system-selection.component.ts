import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { GameSystem } from '../../models/game-system';

@Component({
  selector: 'assoc-library-game-system-selection',
  standalone: true,
  imports: [WaitingWrapperComponent, ButtonListComponent, PaginationNavigationComponent],
  templateUrl: './library-game-system-selection.component.html'
})
export class LibraryGameSystemSelectionComponent {

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

  @Output() public cancel = new EventEmitter<void>();

  public onPick(gameSystem: GameSystem) {
    this.choose.emit(gameSystem);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

  public onCancel() {
    this.cancel.emit();
  }

  public nameRenderer(gameSystem: GameSystem) {
    return gameSystem.name;
  }

}
