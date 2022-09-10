import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '@app/api/models/pagination';
import { PaginationStatus } from '@app/api/pagination/pagination-status';
import { RoutePaginationObserver } from '@app/api/route/observer/route-pagination-observer';
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

  constructor(
    private service: MemberService,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new RoutePaginationObserver(route)
  }

  ngOnInit(): void {
    this.service.getAll({}).subscribe(page => {
      this.members = page.content;
      this.paginationStatus.load(page);
      // Listens for changes on pagination params
      this.routePaginationObserver.pagination.subscribe(pagination => {
        this.load(pagination);
      });
    });
  }

  private load(pagination: Pagination) {
    this.service.getAll(pagination).subscribe(page => {
      this.members = page.content;
      this.paginationStatus.load(page);
    });
  }

}
