import { Component } from '@angular/core';
import { Publisher } from '@app/models/library/publisher';
import { PagedSelectorComponent } from '@app/shared/form/components/paged-selector/paged-selector.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { BlockUiDirective, ButtonListComponent } from '@bernardo-mg/layout';

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
