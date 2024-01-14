import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '../../../membership/models/member';

@Component({
  selector: 'assoc-member-selection',
  templateUrl: './fee-member-selection.component.html',
  styleUrls: ['./fee-member-selection.component.sass']
})
export class FeeMemberSelectionComponent {

  @Input() public waiting = false;

  @Input() public members: Member[] = [];

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
