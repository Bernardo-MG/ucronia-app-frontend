import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort } from '@app/api/models/sort';
import { RouteApiActuator } from '@app/api/route/actuator/route-api-actuator';
import { RoutePaginationObserver } from '@app/api/route/observer/route-pagination-observer';

@Component({
  selector: 'order-button',
  templateUrl: './order-button.component.html',
  styleUrls: ['./order-button.component.sass']
})
export class OrderButtonComponent implements OnInit {

  @Input() property: string = '';

  @Input() direction: 'asc' | 'desc' | 'unsorted' = 'unsorted';

  private apiActuator: RouteApiActuator;

  private routePaginationObserver: RoutePaginationObserver;

  constructor(
    router: Router,
    route: ActivatedRoute
  ) {
    this.apiActuator = new RouteApiActuator(router);
    this.routePaginationObserver = new RoutePaginationObserver(route);
  }

  ngOnInit(): void {
    this.routePaginationObserver.pagination.subscribe(p => {
      if (p) {
        const propertySort = p.sort?.find(s => s.property === this.property);
        if (propertySort) {
          this.direction = propertySort.order;
        } else {
          this.direction = 'unsorted';
        }
      } else {
        this.direction = 'unsorted';
      }
    });
  }

  public onSortAscending() {
    this.sort('asc');
  }

  public onSortDescending() {
    this.sort('desc');
  }

  public onSortUnsorted() {
    this.apiActuator.removeOrder(this.property);
  }

  private sort(direction: 'asc' | 'desc') {
    const sort: Sort<any> = {
      property: this.property,
      order: direction
    };

    this.apiActuator.setOrder(sort);
  }

}
