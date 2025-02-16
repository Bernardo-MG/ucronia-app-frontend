import { Component } from '@angular/core';
import { BookType } from '@app/models/library/book-type';
import { PagedSelectorComponent } from '@app/shared/form/components/paged-selector/paged-selector.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { BlockUiDirective, ButtonListComponent, JustifyCenterDirective } from '@bernardo-mg/layout';

@Component({
    selector: 'assoc-library-admin-book-type-selection',
    imports: [ButtonListComponent, PaginationNavigationComponent, JustifyCenterDirective, BlockUiDirective],
    templateUrl: './library-admin-book-type-selection.component.html'
})
export class LibraryAdminBookTypeSelectionComponent extends PagedSelectorComponent<BookType> {

  public nameRenderer(data: BookType): string {
    return data.name;
  }

}
