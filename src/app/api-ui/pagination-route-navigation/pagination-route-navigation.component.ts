import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { RouteApiActuator } from '@app/api/route/actuator/route-api-actuator';

@Component({
  selector: 'pagination-route-navigation',
  templateUrl: './pagination-route-navigation.component.html',
  styleUrls: ['./pagination-route-navigation.component.sass']
})
export class RoutePaginationNavigationComponent {

  @Input() public pageInfo: PageInfo = new PageInfo();

  private apiActuator: RouteApiActuator;

  constructor(
    router: Router
  ) {
    this.apiActuator = new RouteApiActuator(router);
  }

  public onGoTo(page: number) {
    this.apiActuator.setPage(page);
  }

}
