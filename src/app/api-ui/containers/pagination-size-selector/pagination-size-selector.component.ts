import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteApiActuator } from '@app/api/route/actuator/route-api-actuator';
import { RoutePaginationObserver } from '@app/api/route/observer/route-pagination-observer';

@Component({
  selector: 'pagination-size-selector',
  templateUrl: './pagination-size-selector.component.html',
  styleUrls: ['./pagination-size-selector.component.sass']
})
export class PaginationSizeSelectorComponent {

  @Input() public sizes: number[] = [5, 10, 15, 20];

  @Input() public selected: number = 5;

  private apiActuator: RouteApiActuator;

  private routePaginationObserver: RoutePaginationObserver;

  constructor(
    router: Router,
    route: ActivatedRoute
  ) {
    this.apiActuator = new RouteApiActuator(router);
    this.routePaginationObserver = new RoutePaginationObserver(route);
  }

  public onSelect(size: number) {
    this.apiActuator.setPageSize(size);
  }

}
