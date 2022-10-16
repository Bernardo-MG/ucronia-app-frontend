import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RouteApiActuator } from '@app/api/route/actuator/route-api-actuator';

@Component({
  selector: 'pagination-size-selector',
  templateUrl: './pagination-size-selector.component.html',
  styleUrls: ['./pagination-size-selector.component.sass']
})
export class PaginationSizeSelectorComponent {

  @Input() public sizes: number[] = [];

  @Input() public selected: number = 0;

  private apiActuator: RouteApiActuator;

  constructor(
    router: Router
  ) {
    this.apiActuator = new RouteApiActuator(router);
  }

  public onSelect(size: number) {
    this.apiActuator.setPageSize(size);
  }

}
