import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageInfo } from '@app/api/models/page-info';
import { Member } from '@app/models/member';

@Component({
  selector: 'crud-member-selection',
  templateUrl: './member-selection.component.html',
  styleUrls: ['./member-selection.component.sass']
})
export class MemberSelectionComponent {

  @Input() public members: Member[] = [];

  @Input() public pageInfo = new PageInfo();

  @Output() public selectPage = new EventEmitter<Member>();

  @Output() public goToPage = new EventEmitter<number>();

  constructor() { }

  public onSelect(member: Member) {
    this.selectPage.emit(member);
  }

  public onGoToPage(page: number) {
    this.goToPage.emit(page);
  }

}
