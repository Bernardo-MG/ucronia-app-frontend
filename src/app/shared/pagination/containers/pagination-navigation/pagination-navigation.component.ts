import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteApiActuator } from '@app/shared/utils/api/route/actuator/route-api-actuator';
import { PaginationRouteObserver } from '@app/shared/utils/api/route/observer/pagination-route-observer';

@Component({
  selector: 'pagination-navigation',
  templateUrl: './pagination-navigation.component.html',
  styleUrls: ['./pagination-navigation.component.sass']
})
export class PaginationNavigationComponent implements OnInit {

  @Input() public totalPages = 0;

  @Input() public disabled = false;

  public page = 0;

  private apiActuator: RouteApiActuator;

  private routePaginationObserver: PaginationRouteObserver;

  constructor(
    router: Router,
    route: ActivatedRoute
  ) {
    this.apiActuator = new RouteApiActuator(router);
    this.routePaginationObserver = new PaginationRouteObserver(route);
  }

  ngOnInit(): void {
    this.routePaginationObserver.subject.subscribe(p => {
      if ((p) && (p.page)) {
        this.page = p.page;
      } else {
        this.page = 0;
      }
    });
  }

  public onGoTo(page: number) {
    this.apiActuator.setPage(page);
  }

}
