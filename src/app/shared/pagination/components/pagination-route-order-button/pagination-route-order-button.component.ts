import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort } from '@app/core/api/models/sort';
import { RouteApiActuator } from '@app/shared/utils/api/route/actuator/route-api-actuator';
import { SortRouteObserver } from '@app/shared/utils/api/route/observer/sort-route-observer';
import { Direction } from '../../../../core/api/models/direction';

@Component({
  selector: 'pagination-route-order-button',
  templateUrl: './pagination-route-order-button.component.html'
})
export class PaginationRouteOrderButtonComponent implements OnInit {

  @Input() public property = '';

  @Input() public disabled = false;

  public direction = Direction.Unsorted;

  private routeActuator: RouteApiActuator;

  private sortObserver: SortRouteObserver;

  constructor(
    router: Router,
    route: ActivatedRoute
  ) {
    this.routeActuator = new RouteApiActuator(router);
    this.sortObserver = new SortRouteObserver(route);
  }

  ngOnInit(): void {
    this.sortObserver.subject.subscribe(p => {
      if (p) {
        const propertySort = p.find(s => s.property === this.property);
        if (propertySort) {
          this.direction = propertySort.direction as Direction;
        } else {
          this.direction = Direction.Unsorted;
        }
      } else {
        this.direction = Direction.Unsorted;
      }
    });
  }

  public onChangeDirection(direction: Direction) {
    if (direction === Direction.Unsorted) {
      this.routeActuator.removeOrder(this.property);
    } else {
      const sort: Sort<any> = {
        property: this.property,
        direction
      };

      this.routeActuator.setOrder(sort);
    }
  }

}
