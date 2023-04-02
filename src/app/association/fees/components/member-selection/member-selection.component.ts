import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageInfo } from '@app/api/models/page-info';
import { Member } from '@app/models/member';

@Component({
  selector: 'admin-member-selection',
  templateUrl: './member-selection.component.html',
  styleUrls: ['./member-selection.component.sass']
})
export class MemberSelectionComponent implements OnInit {

  @Input() public members: Member[] = [];

  @Input() public pageInfo = new PageInfo();

  @Output() public selectMember = new EventEmitter<Member>();

  @Output() public goToPage = new EventEmitter<number>();

  constructor() { }

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
