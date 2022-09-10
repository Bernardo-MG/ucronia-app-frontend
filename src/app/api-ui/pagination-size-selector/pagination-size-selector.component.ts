import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationStatus } from '@app/api/pagination/pagination-status';
import { RouteApiActuator } from '@app/api/route/actuator/route-api-actuator';

@Component({
  selector: 'pagination-size-selector',
  templateUrl: './pagination-size-selector.component.html',
  styleUrls: ['./pagination-size-selector.component.sass']
})
export class PaginationSizeSelectorComponent {

  @Input() public sizes: number[] = [5, 10, 15, 20];

  @Input() public size: number = 5;

  private apiActuator: RouteApiActuator;

  constructor(
    router: Router
  ) {
    this.apiActuator = new RouteApiActuator(router);
  }

  public selectSize(size: number) {
    this.apiActuator.setPageSize(size);
  }

}
