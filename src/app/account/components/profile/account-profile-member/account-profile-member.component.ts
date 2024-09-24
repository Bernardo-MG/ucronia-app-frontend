import { Component, Input } from '@angular/core';
import { Member } from '@app/models/members/member';

@Component({
  selector: 'account-profile-member',
  standalone: true,
  imports: [],
  templateUrl: './account-profile-member.component.html'
})
export class AccountProfileMemberComponent {

  @Input() data = new Member();

}
