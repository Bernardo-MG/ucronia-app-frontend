import { Component } from '@angular/core';
import { GameSystem } from '@app/domain/library/game-system';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { PagedSelectorComponent } from '@bernardo-mg/form';
import { BlockUiDirective, ButtonListComponent, JustifyCenterDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'assoc-library-admin-game-system-selection',
  imports: [ButtonListComponent, PaginationNavigationComponent, JustifyCenterDirective, BlockUiDirective],
  templateUrl: './library-admin-game-system-selection.component.html'
})
export class LibraryAdminGameSystemSelectionComponent extends PagedSelectorComponent<GameSystem> {

  public nameRenderer = (data: GameSystem): string => data.name;

}
