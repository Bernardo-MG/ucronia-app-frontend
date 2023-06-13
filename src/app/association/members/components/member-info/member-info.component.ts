import { Component, Input } from '@angular/core';
import { Member } from '@app/association/models/member';

@Component({
  selector: 'assoc-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.sass']
})
export class MemberInfoComponent {

  @Input() data = new Member();

}
