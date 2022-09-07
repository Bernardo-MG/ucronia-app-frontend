import { Component, OnInit } from '@angular/core';
import { PaginationStatus } from '@app/api/pagination/pagination-status';
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
  
  public paginationStatus: PaginationStatus = new PaginationStatus();

  constructor(
    private service: MemberService,
    public paginationActuator: RoutePaginationActuator
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
    this.service.getAll().subscribe(page => {
      this.members = page.content;
      this.paginationActuator.load(page);
      this.paginationStatus.load(page);
    });
  }

}
