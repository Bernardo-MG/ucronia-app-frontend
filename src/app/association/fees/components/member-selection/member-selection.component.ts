import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from '@app/association/models/member';
import { PageInfo } from '@app/shared/api/models/page-info';

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
