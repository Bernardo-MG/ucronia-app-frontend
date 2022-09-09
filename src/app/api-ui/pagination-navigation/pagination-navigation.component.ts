import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationActuator } from '@app/api/pagination/actuator/pagination-actuator';
import { RoutePaginationActuator } from '@app/api/pagination/actuator/route-pagination-actuator';
import { PaginationStatus } from '@app/api/pagination/pagination-status';

@Component({
  selector: 'pagination-navigation',
  templateUrl: './pagination-navigation.component.html',
  styleUrls: ['./pagination-navigation.component.sass']
})
export class PaginationNavigationComponent {

  @Input() public actuator: PaginationActuator;

  @Input() public status: PaginationStatus = new PaginationStatus();

  constructor(
    router: Router
  ) {
    this.actuator = new RoutePaginationActuator(router);
  }

  public moveToPage(page: number) {
    this.actuator.toPage(page);
  }

  public movePrevious(page: number) {
    this.actuator.toPreviousPage();
  }

  public moveNext(page: number) {
    this.actuator.toNextPage();
  }

}
