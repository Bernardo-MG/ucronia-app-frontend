import { Component, Input } from '@angular/core';
import { Member } from '@app/association/models/member';

@Component({
  selector: 'assoc-member-selection-list',
  templateUrl: './member-selection-list.component.html'
})
export class MemberSelectionListComponent {

  @Input() public members: Member[] = [];

}
