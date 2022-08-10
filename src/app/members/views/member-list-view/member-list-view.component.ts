import { Component } from '@angular/core';
import { MemberService } from '@app/members/services/member.service';
import { Member } from '@app/models/member';

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
