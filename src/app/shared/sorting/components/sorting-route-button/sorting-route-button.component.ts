import { Component, Input, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteApiActuator } from '@app/shared/utils/api/route/actuator/route-api-actuator';
import { SortRouteObserver } from '@app/shared/utils/api/route/observer/sort-route-observer';
import { SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { SortingButtonComponent } from '../sorting-button/sorting-button.component';

@Component({
  selector: 'sorting-route-button',
  imports: [SortingButtonComponent],
  templateUrl: './sorting-route-button.component.html'
})
export class SortingRouteButtonComponent {

  @Input() public property = '';

  public readonly disabled = input(false);

  public direction = SortingDirection.Unsorted;

  private readonly routeActuator: RouteApiActuator;

  constructor() {
    const router = inject(Router);
    const route = inject(ActivatedRoute);

    this.routeActuator = new RouteApiActuator(router);
    new SortRouteObserver(route).subject
      .subscribe(p => {
        if (p) {
          const propertySort = p.find(s => s.property === this.property);
          if (propertySort) {
            this.direction = propertySort.direction as SortingDirection;
          } else {
            this.direction = SortingDirection.Unsorted;
          }
        } else {
          this.direction = SortingDirection.Unsorted;
        }
      });
  }

  public onChangeDirection(sort: SortingProperty) {
    if (sort.direction === SortingDirection.Unsorted) {
      this.routeActuator.removeOrder(this.property);
    } else {
      this.routeActuator.setOrder(sort);
    }
  }

}
