import { Component, OnInit } from '@angular/core';
import { MemberService } from '@app/crud/members/services/member.service';
import { Member } from '@app/models/member';

@Component({
  selector: 'crud-member-list-view',
  templateUrl: './member-list-view.component.html',
  styleUrls: ['./member-list-view.component.sass']
})
export class MemberListViewComponent implements OnInit {

  public members: Member[] = [];

  constructor(
    private service: MemberService
  ) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(d => this.members = d);
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.service.getAll().subscribe(d => this.members = d);
    });
  }

}
