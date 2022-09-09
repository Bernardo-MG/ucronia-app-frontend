import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { RouteApiActuator } from '@app/api/route/actuator/route-api-actuator';

@Component({
  selector: 'pagination-size-selector',
  templateUrl: './pagination-size-selector.component.html',
  styleUrls: ['./pagination-size-selector.component.sass']
})
export class PaginationSizeSelectorComponent implements OnInit, OnChanges {

  @Input() public sizes: number[] = [5, 10, 15, 20];

  private apiActuator: RouteApiActuator;

  constructor(
    router: Router
  ) {
    this.apiActuator = new RouteApiActuator(router);
  }

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
