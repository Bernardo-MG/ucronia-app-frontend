import { Component } from '@angular/core';
import { Author } from '@app/models/library/author';
import { PagedSelectorComponent } from '@app/shared/form/components/paged-selector/paged-selector.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { BlockUiDirective, ButtonListComponent } from '@bernardo-mg/layout';

@Component({
    selector: 'assoc-library-admin-author-selection',
    imports: [ButtonListComponent, PaginationNavigationComponent, BlockUiDirective],
    templateUrl: './library-admin-author-selection.component.html'
})
export class LibraryAdminAuthorSelectionComponent extends PagedSelectorComponent<Author> {

  public nameRenderer(data: Author): string {
    return data.name;
  }

}
