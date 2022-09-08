import { Component, Input } from '@angular/core';
import { RouteOrderActuator } from '@app/api/order/actuator/route-order-actuator';

@Component({
  selector: 'order-controller-button',
  templateUrl: './order-controller-button.component.html',
  styleUrls: ['./order-controller-button.component.sass']
})
export class OrderControllerButtonComponent {

  @Input() property: any;

  constructor(private orderController: RouteOrderActuator) { }

  public sortAscending() {
    this.orderController.sortAscending(this.property);
  }

  public sortDescending() {
    this.orderController.sortDescending(this.property);
  }

}
