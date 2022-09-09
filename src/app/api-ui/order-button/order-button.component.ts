import { Component, Input } from '@angular/core';
import { RouteOrderActuator } from '@app/api/order/actuator/route-order-actuator';

@Component({
  selector: 'order-button',
  templateUrl: './order-button.component.html',
  styleUrls: ['./order-button.component.sass']
})
export class OrderButtonComponent {

  @Input() property: any;

  constructor(private orderController: RouteOrderActuator) { }

  public sortAscending() {
    this.orderController.sortAscending(this.property);
  }

  public sortDescending() {
    this.orderController.sortDescending(this.property);
  }

}
