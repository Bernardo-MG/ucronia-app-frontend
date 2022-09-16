import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '@app/models/member';

@Component({
  selector: 'crud-member-selection-modal',
  templateUrl: './member-selection-modal.component.html',
  styleUrls: ['./member-selection-modal.component.sass']
})
export class MemberSelectionModalComponent {

  @Input() public members: Member[] = [];

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
