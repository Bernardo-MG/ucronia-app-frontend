import { Component } from '@angular/core';
import { Person } from '@app/models/person/person';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { PagedSelectorComponent } from '@bernardo-mg/form';
import { BlockUiDirective, ButtonListComponent, JustifyCenterDirective } from '@bernardo-mg/layout';

@Component({
    selector: 'assoc-library-admin-donor-selection',
    imports: [ButtonListComponent, PaginationNavigationComponent, JustifyCenterDirective, BlockUiDirective],
    templateUrl: './library-admin-donor-selection.component.html'
})
export class LibraryAdminDonorSelectionComponent extends PagedSelectorComponent<Person> {

  public nameRenderer = (data: Person): string => data.name.fullName;

}
