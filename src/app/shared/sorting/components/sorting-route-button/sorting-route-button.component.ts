import { Component, Input, OnInit } from '@angular/core';
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
export class SortingRouteButtonComponent implements OnInit {

  @Input() public property = '';

  @Input() public disabled = false;

  public direction = SortingDirection.Unsorted;

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
