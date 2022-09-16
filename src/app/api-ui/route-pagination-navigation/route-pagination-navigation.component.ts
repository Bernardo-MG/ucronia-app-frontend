import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { RouteApiActuator } from '@app/api/route/actuator/route-api-actuator';

@Component({
  selector: 'route-pagination-navigation',
  templateUrl: './route-pagination-navigation.component.html',
  styleUrls: ['./route-pagination-navigation.component.sass']
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
