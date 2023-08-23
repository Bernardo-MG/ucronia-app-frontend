import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort } from '@app/core/api/models/sort';
import { RouteApiActuator } from '@app/shared/utils/api/route/actuator/route-api-actuator';
import { SortRouteObserver } from '@app/shared/utils/api/route/observer/sort-route-observer';
import { Direction } from '../../../../core/api/models/direction';

@Component({
  selector: 'pagination-order-button',
  templateUrl: './pagination-order-button.component.html'
})
export class PaginationOrderButtonComponent implements OnInit {

  @Input() property = '';

  @Input() direction = Direction.Unsorted;

  @Input() public disabled = false;

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
          this.direction = propertySort.order as Direction;
        } else {
          this.direction = Direction.Unsorted;
        }
      } else {
        this.direction = Direction.Unsorted;
      }
    });
  }

  public onChangeDirection(direction: Direction) {
    let order: 'asc' | 'desc';
    switch (direction) {
      case Direction.Ascending:
        order = 'asc';
        break;
      case Direction.Descending:
        order = 'desc';
        break;
      default:
        order = 'asc';
        break;
    }
    const sort: Sort<any> = {
      property: this.property,
      order
    };

    this.routeActuator.setOrder(sort);
  }

}
