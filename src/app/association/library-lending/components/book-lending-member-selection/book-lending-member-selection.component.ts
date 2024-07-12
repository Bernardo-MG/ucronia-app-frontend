import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '@app/association/members/models/member';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';

@Component({
  selector: 'assoc-book-lending-member-selection',
  standalone: true,
  imports: [ButtonListComponent, WaitingOverlayComponent, PaginationNavigationComponent],
  templateUrl: './book-lending-member-selection.component.html'
})
export class BookLendingMemberSelectionComponent {

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

  public nameRenderer(member: Member) {
    return member.name.fullName;
  }

}
