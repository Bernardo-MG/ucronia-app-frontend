import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { Member } from '../../../members/models/member';

@Component({
  selector: 'assoc-member-selection',
  standalone: true,
  imports: [LayoutModule, PaginationModule],
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
