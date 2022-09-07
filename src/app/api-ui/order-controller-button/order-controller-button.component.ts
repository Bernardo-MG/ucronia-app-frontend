import { Component, Input } from '@angular/core';
import { RouteOrderController } from '@app/api/order/route-order-controller';

@Component({
  selector: 'order-controller-button',
  templateUrl: './order-controller-button.component.html',
  styleUrls: ['./order-controller-button.component.sass']
})
export class OrderControllerButtonComponent {

  @Input() property: any;

  constructor(private orderController: RouteOrderController) { }

  public sortAscending() {
    this.orderController.sortAscending(this.property);
  }

  public sortDescending() {
    this.orderController.sortDescending(this.property);
  }

}
