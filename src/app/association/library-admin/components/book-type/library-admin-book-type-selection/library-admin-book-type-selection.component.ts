import { Component } from '@angular/core';
import { BookType } from '@app/association/library/models/book-type';
import { PagedSelectorComponent } from '@app/shared/form/components/paged-selector/paged-selector.component';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
  selector: 'assoc-library-admin-book-type-selection',
  standalone: true,
  imports: [ButtonListComponent, PaginationNavigationComponent, JustifyCenterDirective, BlockUiDirective],
  templateUrl: './library-admin-book-type-selection.component.html'
})
export class LibraryAdminBookTypeSelectionComponent extends PagedSelectorComponent<BookType> {

  public override nameRenderer(data: BookType): string {
    return data.name;
  }

}
