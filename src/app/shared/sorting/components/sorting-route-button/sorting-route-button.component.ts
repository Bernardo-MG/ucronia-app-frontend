import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortProperty } from '@app/core/api/models/sort-field';
import { RouteApiActuator } from '@app/shared/utils/api/route/actuator/route-api-actuator';
import { SortRouteObserver } from '@app/shared/utils/api/route/observer/sort-route-observer';
import { SortDirection } from '../../../../core/api/models/sort-direction';
import { SortingButtonComponent } from '../sorting-button/sorting-button.component';

@Component({
    selector: 'sorting-route-button',
    imports: [SortingButtonComponent],
    templateUrl: './sorting-route-button.component.html'
})
export class SortingRouteButtonComponent implements OnInit {

  @Input() public property = '';

  @Input() public disabled = false;

  public direction = SortDirection.Unsorted;

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
          this.direction = propertySort.direction as SortDirection;
        } else {
          this.direction = SortDirection.Unsorted;
        }
      } else {
        this.direction = SortDirection.Unsorted;
      }
    });
  }

  public onChangeDirection(sort: SortProperty) {
    if (sort.direction === SortDirection.Unsorted) {
      this.routeActuator.removeOrder(this.property);
    } else {
      this.routeActuator.setOrder(sort);
    }
  }

}
