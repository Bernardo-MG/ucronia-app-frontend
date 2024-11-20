import { Component } from '@angular/core';
import { GameSystem } from '@app/models/library/game-system';
import { PagedSelectorComponent } from '@app/shared/form/components/paged-selector/paged-selector.component';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
  selector: 'assoc-library-admin-game-system-selection',
  standalone: true,
  imports: [ButtonListComponent, PaginationNavigationComponent, JustifyCenterDirective, BlockUiDirective],
  templateUrl: './library-admin-game-system-selection.component.html'
})
export class LibraryAdminGameSystemSelectionComponent extends PagedSelectorComponent<GameSystem> {

  public nameRenderer(data: GameSystem): string {
    return data.name;
  }

}
