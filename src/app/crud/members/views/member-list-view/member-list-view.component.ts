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

  public currentPagination: Pagination = new Pagination();

  public size: number = 0;

  private routePaginationObserver: RoutePaginationObserver;

  constructor(
    public paginationActuator: RoutePaginationActuator,
    private service: MemberService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new RoutePaginationObserver(route)
  }

  ngOnInit(): void {
    this.loadDefault();

    this.routePaginationObserver.pagination.subscribe(pagination => {
      this.size = pagination.size;
      this.load(pagination);
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe(d => {
      this.loadDefault();
    });
  }

  private loadDefault() {
    this.service.getAllDefault().subscribe(page => {
      this.members = page.content;
      this.paginationActuator.load(page);
      this.paginationStatus.load(page);
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
