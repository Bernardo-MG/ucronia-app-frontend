import { Component, OnInit } from '@angular/core';
import { PageInfo } from '@app/api/models/page-info';
import { MemberService } from '@app/crud/members/services/member.service';
import { Member } from '@app/models/member';

@Component({
  selector: 'crud-member-list-view',
  templateUrl: './member-list-view.component.html',
  styleUrls: ['./member-list-view.component.sass']
})
export class MemberListViewComponent implements OnInit {

  public members: Member[] = [];

  public pageInfo = new PageInfo();

  constructor(
    private service: MemberService
  ) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(page => {
      this.members = page.content;
      this.pageInfo = page;
    });
  }

}
