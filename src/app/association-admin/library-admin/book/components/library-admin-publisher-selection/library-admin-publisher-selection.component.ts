import { Component } from '@angular/core';
import { Publisher } from '@app/domain/library/publisher';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { PagedSelectorComponent } from '@bernardo-mg/form';
import { BlockUiDirective, ButtonListComponent, JustifyCenterDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'assoc-library-admin-publisher-selection',
  imports: [ButtonListComponent, PaginationNavigationComponent, JustifyCenterDirective, BlockUiDirective],
  templateUrl: './library-admin-publisher-selection.component.html'
})
export class LibraryAdminPublisherSelectionComponent extends PagedSelectorComponent<Publisher> {

  public nameRenderer = (data: Publisher): string => data.name;

}
