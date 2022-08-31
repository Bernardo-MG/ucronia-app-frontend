import { Component } from '@angular/core';
import { MemberService } from '@app/members/services/member.service';
import { Member } from '@app/models/member';

@Component({
  selector: 'member-list-view',
  templateUrl: './member-list-view.component.html',
  styleUrls: ['./member-list-view.component.sass']
})
export class MemberListViewComponent {

  public members: Member[] = [];

  constructor(
    private service: MemberService
  ) {
    this.service.getAll().subscribe(d => this.members = d);
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.service.getAll().subscribe(d => this.members = d);
    });
  }

}
