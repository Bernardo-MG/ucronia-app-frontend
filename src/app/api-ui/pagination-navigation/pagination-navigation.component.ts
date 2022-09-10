import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { RouteApiActuator } from '@app/api/route/actuator/route-api-actuator';

@Component({
  selector: 'pagination-navigation',
  templateUrl: './pagination-navigation.component.html',
  styleUrls: ['./pagination-navigation.component.sass']
})
export class PaginationNavigationComponent {

  @Input() public pageInfo: PageInfo = new PageInfo();

  private apiActuator: RouteApiActuator;

  constructor(
    router: Router
  ) {
    this.apiActuator = new RouteApiActuator(router);
  }

  public moveToPage(page: number) {
    this.apiActuator.setPage(page);
  }

  public movePrevious(page: number) {
    this.apiActuator.setPage(page - 1);
  }

  public moveNext(page: number) {
    this.apiActuator.setPage(page + 1);
  }

}
