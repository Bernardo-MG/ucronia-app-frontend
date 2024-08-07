import { Component } from '@angular/core';
import { Person } from '@app/association/library/models/person';
import { PagedSelectorComponent } from '@app/shared/form/components/paged-selector/paged-selector.component';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';

@Component({
  selector: 'assoc-library-admin-donor-selection',
  standalone: true,
  imports: [ButtonListComponent, WaitingOverlayComponent, PaginationNavigationComponent],
  templateUrl: './library-admin-donor-selection.component.html'
})
export class LibraryAdminDonorSelectionComponent extends PagedSelectorComponent<Person> {

  public override nameRenderer(data: Person): string {
    return data.name.fullName;
  }

}
