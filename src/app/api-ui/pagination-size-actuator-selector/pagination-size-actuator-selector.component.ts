import { Component, Input } from '@angular/core';
import { RouteApiActuator } from '@app/api/actuator/route-api-actuator';

@Component({
  selector: 'pagination-size-actuator-selector',
  templateUrl: './pagination-size-actuator-selector.component.html',
  styleUrls: ['./pagination-size-actuator-selector.component.sass']
})
export class PaginationSizeActuatorSelectorComponent {

  @Input() public selected: number = 5;

  constructor(
    private apiActuator: RouteApiActuator
  ) { }

  public selectSize(size: number) {
    this.apiActuator.setPageSize(size);
  }

}
