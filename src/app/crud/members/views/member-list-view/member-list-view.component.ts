import { Component, OnInit } from '@angular/core';
import { RoutePaginationActuator } from '@app/api/pagination/route-pagination-actuator';
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
    private service: MemberService,
    public paginationController: RoutePaginationActuator
  ) { }

  ngOnInit(): void {
    this.load();
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.load();
    });
  }

  private load() {
    this.service.getAll().subscribe(p => {
      this.members = p.content;
      this.paginationController.setPagination(p);
    });
  }

}
