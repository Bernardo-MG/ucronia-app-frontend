import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PageInfo } from '@app/api/models/page-info';
import { RouteApiActuator } from '@app/api/route/actuator/route-api-actuator';

@Component({
  selector: 'route-pagination-size-selector',
  templateUrl: './route-pagination-size-selector.component.html',
  styleUrls: ['./route-pagination-size-selector.component.sass']
})
export class RoutePaginationSizeSelectorComponent {

  @Input() public sizes: number[] = [5, 10, 15, 20];

  @Input() public pageInfo: PageInfo = new PageInfo();

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
