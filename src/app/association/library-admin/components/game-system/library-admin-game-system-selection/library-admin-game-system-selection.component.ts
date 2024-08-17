import { Component } from '@angular/core';
import { GameSystem } from '@app/association/library/models/game-system';
import { PagedSelectorComponent } from '@app/shared/form/components/paged-selector/paged-selector.component';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
  selector: 'assoc-library-admin-game-system-selection',
  standalone: true,
  imports: [WaitingOverlayComponent, ButtonListComponent, PaginationNavigationComponent, JustifyCenterDirective],
  templateUrl: './library-admin-game-system-selection.component.html'
})
export class LibraryAdminGameSystemSelectionComponent extends PagedSelectorComponent<GameSystem> {

  public override nameRenderer(data: GameSystem): string {
    return data.name;
  }

}
