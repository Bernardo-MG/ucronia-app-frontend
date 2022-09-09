import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '@app/api/models/pagination';
import { RoutePaginationObserver } from '@app/api/route/observer/route-pagination-observer';
import { RoutePaginationActuator } from '@app/api/pagination/actuator/route-pagination-actuator';
import { PaginationStatus } from '@app/api/pagination/pagination-status';
import { MemberService } from '@app/crud/members/services/member.service';
import { Member } from '@app/models/member';
import { RouteApiActuator } from '@app/api/route/actuator/route-api-actuator';

@Component({
  selector: 'crud-member-list-view',
  templateUrl: './member-list-view.component.html',
  styleUrls: ['./member-list-view.component.sass']
})
export class MemberListViewComponent implements OnInit {

  public members: Member[] = [];

  public paginationStatus = new PaginationStatus();

  public currentPagination: Pagination = new Pagination();

  private routePaginationObserver: RoutePaginationObserver;
  
  public paginationActuator: RoutePaginationActuator;

  constructor(
    private service: MemberService,
    apiActuator: RouteApiActuator,
    route: ActivatedRoute
  ) {
    this.paginationActuator = new RoutePaginationActuator(apiActuator);
    this.routePaginationObserver = new RoutePaginationObserver(route)
  }

  ngOnInit(): void {
    this.routePaginationObserver.pagination.subscribe(pagination => {
      this.load(pagination);
    });
  }

  private load(pagination: Pagination) {
    this.service.getAll(pagination).subscribe(page => {
      this.members = page.content;
      this.paginationStatus.load(page);
    });
  }

}
