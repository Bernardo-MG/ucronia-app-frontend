import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Sort } from '@app/api/models/sort';
import { RouteApiActuator } from '@app/api/route/actuator/route-api-actuator';

@Component({
  selector: 'order-button',
  templateUrl: './order-button.component.html',
  styleUrls: ['./order-button.component.sass']
})
export class OrderButtonComponent {

  @Input() property: string = '';

  private apiActuator: RouteApiActuator;

  constructor(
    router: Router
  ) {
    this.apiActuator = new RouteApiActuator(router);
  }

  public onSortAscending() {
    const sort: Sort<any> = {
      property: this.property,
      order: "asc"
    };

    this.apiActuator.setOrder(sort);
  }

  public onSortDescending() {
    const sort: Sort<any> = {
      property: this.property,
      order: "desc"
    };

    this.apiActuator.setOrder(sort);
  }

}
