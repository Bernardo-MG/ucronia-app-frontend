import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '@app/api/models/pagination';
import { RoutePaginationObserver } from '@app/api/observer/route-pagination-observer';
import { RoutePaginationActuator } from '@app/api/pagination/actuator/route-pagination-actuator';
import { PaginationStatus } from '@app/api/pagination/pagination-status';
import { MemberService } from '@app/crud/members/services/member.service';
import { Member } from '@app/models/member';

@Component({
  selector: 'crud-member-list-view',
  templateUrl: './member-list-view.component.html',
  styleUrls: ['./member-list-view.component.sass']
})
export class MemberListViewComponent implements OnInit {

  public members: Member[] = [];

  public paginationStatus = new PaginationStatus();

  private routePaginationObserver: RoutePaginationObserver;

  private currentPagination: Pagination = new Pagination();

  constructor(
    public paginationActuator: RoutePaginationActuator,
    private service: MemberService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new RoutePaginationObserver(route)
  }

  ngOnInit(): void {
    this.load(this.currentPagination);

    this.routePaginationObserver.pagination.subscribe(pagination => {
      this.load(pagination);
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.load(this.currentPagination);
    });
  }

  private load(pagination: Pagination) {
    this.service.getAll(pagination).subscribe(page => {
      this.members = page.content;
      this.paginationActuator.load(page);
      this.paginationStatus.load(page);
    });
  }

}
