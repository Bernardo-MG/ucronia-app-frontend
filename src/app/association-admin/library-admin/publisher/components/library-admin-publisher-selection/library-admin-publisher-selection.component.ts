import { Component } from '@angular/core';
import { Publisher } from '@app/models/library/publisher';
import { PagedSelectorComponent } from '@app/shared/form/components/paged-selector/paged-selector.component';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
    selector: 'assoc-library-admin-publisher-selection',
    imports: [ButtonListComponent, PaginationNavigationComponent, JustifyCenterDirective, BlockUiDirective],
    templateUrl: './library-admin-publisher-selection.component.html'
})
export class LibraryAdminPublisherSelectionComponent extends PagedSelectorComponent<Publisher> {

  public nameRenderer(data: Publisher): string {
    return data.name;
  }

}
