import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Donor } from '@app/association/library-admin/models/donor';
import { Publisher } from '@app/association/library/models/publisher';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';

@Component({
  selector: 'assoc-library-admin-donor-selection',
  standalone: true,
  imports: [ButtonListComponent, WaitingWrapperComponent, PaginationNavigationComponent],
  templateUrl: './library-admin-donor-selection.component.html'
})
export class LibraryAdminDonorSelectionComponent {

  @Input() public waiting = false;

  @Input() public values: Donor[] = [];

  /**
   * Current page number. This is the pointer to move around the pagination.
   */
  @Input() public current = 1;

  /**
   * Total number of pages.
   */
  @Input() public pages = 0;

  @Output() public choose = new EventEmitter<Donor>();

  @Output() public goToPage = new EventEmitter<number>();

  public onPick(gameSystem: Donor) {
    this.choose.emit(gameSystem);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

  public nameRenderer(donor: Donor) {
    return donor.name.fullName;
  }

}
