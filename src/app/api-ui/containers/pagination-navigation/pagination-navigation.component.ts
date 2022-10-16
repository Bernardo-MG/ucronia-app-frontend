import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RouteApiActuator } from '@app/api/route/actuator/route-api-actuator';

@Component({
  selector: 'pagination-navigation',
  templateUrl: './pagination-navigation.component.html',
  styleUrls: ['./pagination-navigation.component.sass']
})
export class PaginationNavigationComponent {

  @Input() public page: number = 0;

  @Input() public totalPages: number = 0;

  @Input() public first: boolean = false;

  @Input() public last: boolean = false;

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
