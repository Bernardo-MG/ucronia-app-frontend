import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteApiActuator } from '@app/shared/utils/api/route/actuator/route-api-actuator';
import { PaginationRouteObserver } from '@app/shared/utils/api/route/observer/pagination-route-observer';
import { PaginationNavigationComponent } from '../pagination-navigation/pagination-navigation.component';

@Component({
  selector: 'pagination-route-navigation',
  standalone: true,
  imports: [PaginationNavigationComponent],
  templateUrl: './pagination-route-navigation.component.html'
})
export class PaginationRouteNavigationComponent {

  @Input() public totalPages = 0;

  @Input() public disabled = false;

  public page = 0;

  private routeActuator: RouteApiActuator;

  constructor(
    router: Router,
    route: ActivatedRoute
  ) {
    this.routeActuator = new RouteApiActuator(router);
    new PaginationRouteObserver(route).subject.subscribe(p => {
      if ((p) && (p.page)) {
        this.page = p.page;
      } else {
        this.page = 1;
      }
    });
  }

  public onGoTo(page: number) {
    this.routeActuator.setPage(page);
  }

}
