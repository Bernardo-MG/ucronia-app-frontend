import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '@app/models/members/member';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { BlockUiDirective, ButtonListComponent, JustifyCenterDirective } from '@bernardo-mg/layout';

@Component({
  selector: 'assoc-library-admin-book-lending-member-selection',
  imports: [ButtonListComponent, PaginationNavigationComponent, JustifyCenterDirective, BlockUiDirective],
  templateUrl: './library-admin-book-lending-member-selection.component.html'
})
export class LibraryAdminBookLendingMemberSelectionComponent {

  @Input() public waiting = false;

  @Input() public values: Member[] = [];

  /**
   * Current page number. This is the pointer to move around the pagination.
   */
  @Input() public current = 1;

  /**
   * Total number of pages.
   */
  @Input() public pages = 0;

  @Output() public selectMember = new EventEmitter<Member>();

  @Output() public goToPage = new EventEmitter<number>();

  public onPick(member: Member) {
    this.selectMember.emit(member);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

  public nameRenderer = (data: Member): string => data.name.fullName;

}
