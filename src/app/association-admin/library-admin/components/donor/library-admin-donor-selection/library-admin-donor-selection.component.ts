import { Component } from '@angular/core';
import { Person } from '@app/models/library/person';
import { PagedSelectorComponent } from '@app/shared/form/components/paged-selector/paged-selector.component';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { BlockUiDirective } from '@app/shared/layout/directives/block-ui.directive';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
  selector: 'assoc-library-admin-donor-selection',
  standalone: true,
  imports: [ButtonListComponent, PaginationNavigationComponent, JustifyCenterDirective, BlockUiDirective],
  templateUrl: './library-admin-donor-selection.component.html'
})
export class LibraryAdminDonorSelectionComponent extends PagedSelectorComponent<Person> {

  public override nameRenderer(data: Person): string {
    return data.name.fullName;
  }

}
