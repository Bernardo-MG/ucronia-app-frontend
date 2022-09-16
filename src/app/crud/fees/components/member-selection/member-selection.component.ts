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

  @Output() public select = new EventEmitter<Member>();

  constructor() { }

  public onSelect(event: any) {
    if (event.value) {
      const index = Number(event.value);
      const member = this.members[index];
      this.select.emit(member);
    }
  }

}
