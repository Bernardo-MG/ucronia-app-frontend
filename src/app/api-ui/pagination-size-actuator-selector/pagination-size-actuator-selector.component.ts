import { Component } from '@angular/core';
import { RouteApiActuator } from '@app/api/actuator/route-api-actuator';

@Component({
  selector: 'pagination-size-actuator-selector',
  templateUrl: './pagination-size-actuator-selector.component.html',
  styleUrls: ['./pagination-size-actuator-selector.component.sass']
})
export class PaginationSizeActuatorSelectorComponent {

  constructor(
    private apiActuator: RouteApiActuator
  ) { }

  public selectSize(size: number) {
    this.apiActuator.setPageSize(size);
  }

}
