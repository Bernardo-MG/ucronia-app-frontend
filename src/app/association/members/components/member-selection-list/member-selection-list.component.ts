import { Component, Input } from '@angular/core';
import { Member } from '@app/association/models/member';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'assoc-member-selection-list',
  templateUrl: './member-selection-list.component.html'
})
export class MemberSelectionListComponent {

  @Input() public members: Member[] = [];

  public activeIcon = faCheck;
  public inactiveIcon = faX;

}
