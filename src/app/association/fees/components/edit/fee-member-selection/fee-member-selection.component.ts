import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonListComponent } from '@app/shared/layout/components/button-list/button-list.component';
import { WaitingWrapperComponent } from '@app/shared/layout/components/waiting-wrapper/waiting-wrapper.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { Member } from '../../../../members/models/member';

@Component({
  selector: 'assoc-member-selection',
  standalone: true,
  imports: [ButtonListComponent, WaitingWrapperComponent, PaginationNavigationComponent],
  templateUrl: './fee-member-selection.component.html',
  styleUrls: ['./fee-member-selection.component.sass']
})
export class FeeMemberSelectionComponent {

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
