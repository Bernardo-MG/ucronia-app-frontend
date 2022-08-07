import { Component } from '@angular/core';
import { Member } from '@app/members/models/member';
import { MemberService } from '@app/members/services/member.service';

@Component({
  selector: 'app-member-list-view',
  templateUrl: './member-list-view.component.html',
  styleUrls: ['./member-list-view.component.sass']
})
export class MemberListViewComponent {

  data: Member[] = [];

  constructor(
    private service: MemberService
  ) {
    this.service.getMembers().subscribe(d => this.data = d);
  }

}
