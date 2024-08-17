import { Component } from '@angular/core';
import { Author } from '@app/association/library/models/author';
import { PagedSelectorComponent } from '@app/shared/form/components/paged-selector/paged-selector.component';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
  selector: 'assoc-library-admin-author-selection',
  standalone: true,
  imports: [ButtonListComponent, WaitingOverlayComponent, PaginationNavigationComponent, JustifyCenterDirective],
  templateUrl: './library-admin-author-selection.component.html'
})
export class LibraryAdminAuthorSelectionComponent extends PagedSelectorComponent<Author> {

  public override nameRenderer(data: Author): string {
    return data.name;
  }

}
