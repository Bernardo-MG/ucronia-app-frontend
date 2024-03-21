import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { GameSystem } from '../../models/game-system';

@Component({
  selector: 'assoc-library-game-system-selection',
  standalone: true,
  imports: [LayoutModule, PaginationModule],
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

  @Output() public select = new EventEmitter<GameSystem>();

  @Output() public goToPage = new EventEmitter<number>();

  @Output() public cancel = new EventEmitter<void>();

  public onPick(gameSystem: GameSystem) {
    this.select.emit(gameSystem);
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
