import { Component, Input } from '@angular/core';
import { Member } from '../../models/member';

@Component({
  selector: 'assoc-member-info',
  templateUrl: './member-info.component.html'
})
export class MemberInfoComponent {

  @Input() member = new Member();

}
