import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from '@app/association/models/member';
import { TitleValue } from '@app/shared/layout/models/link';

@Component({
  selector: 'assoc-member-selection',
  templateUrl: './member-selection.component.html',
  styleUrls: ['./member-selection.component.sass']
})
export class MemberSelectionComponent implements OnInit {

  @Input() public members: TitleValue[] = [];

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

  public ngOnInit(): void {
    this.goToPage.emit(0);
  }

  public onSelect(member: Member) {
    this.selectMember.emit(member);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

}
