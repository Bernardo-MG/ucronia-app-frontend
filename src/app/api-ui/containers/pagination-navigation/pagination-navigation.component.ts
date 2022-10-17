import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteApiActuator } from '@app/api/route/actuator/route-api-actuator';
import { RoutePaginationObserver } from '@app/api/route/observer/route-pagination-observer';

@Component({
  selector: 'pagination-navigation',
  templateUrl: './pagination-navigation.component.html',
  styleUrls: ['./pagination-navigation.component.sass']
})
export class PaginationNavigationComponent implements OnInit {

  @Input() public totalPages: number = 0;

  @Input() public first: boolean = false;

  @Input() public last: boolean = false;

  public page: number = 0;

  private apiActuator: RouteApiActuator;

  private routePaginationObserver: RoutePaginationObserver;

  constructor(
    router: Router,
    route: ActivatedRoute
  ) {
    this.apiActuator = new RouteApiActuator(router);
    this.routePaginationObserver = new RoutePaginationObserver(route);
  }

  ngOnInit(): void {
    this.routePaginationObserver.pagination.subscribe(p => {
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
