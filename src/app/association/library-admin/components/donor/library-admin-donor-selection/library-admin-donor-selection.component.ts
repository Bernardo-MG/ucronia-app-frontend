import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '@app/association/library/models/person';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';

@Component({
  selector: 'assoc-library-admin-donor-selection',
  standalone: true,
  imports: [ButtonListComponent, WaitingOverlayComponent, PaginationNavigationComponent],
  templateUrl: './library-admin-donor-selection.component.html'
})
export class LibraryAdminDonorSelectionComponent {

  @Input() public waiting = false;

  @Input() public values: Person[] = [];

  /**
   * Current page number. This is the pointer to move around the pagination.
   */
  @Input() public current = 1;

  /**
   * Total number of pages.
   */
  @Input() public pages = 0;

  @Output() public choose = new EventEmitter<Person>();

  @Output() public goToPage = new EventEmitter<number>();

  public onPick(gameSystem: Person) {
    this.choose.emit(gameSystem);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

  public nameRenderer(donor: Person) {
    return donor.name.fullName;
  }

}
