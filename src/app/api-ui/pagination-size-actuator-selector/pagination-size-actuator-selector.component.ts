import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouteApiActuator } from '@app/api/actuator/route-api-actuator';

@Component({
  selector: 'pagination-size-actuator-selector',
  templateUrl: './pagination-size-actuator-selector.component.html',
  styleUrls: ['./pagination-size-actuator-selector.component.sass']
})
export class PaginationSizeActuatorSelectorComponent implements OnInit, OnChanges {

  @Input() public sizes: number[] = [5, 10, 15, 20];

  constructor(
    private apiActuator: RouteApiActuator
  ) { }

  ngOnInit(): void {
    if (this.sizes.length > 0) {
      this.apiActuator.setPageSize(this.sizes[0]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sizes.length > 0) {
      this.apiActuator.setPageSize(this.sizes[0]);
    }
  }

  public selectSize(size: number) {
    this.apiActuator.setPageSize(size);
  }

}
