import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort } from '@app/api/models/sort';
import { RouteApiActuator } from '@app/api/route/actuator/route-api-actuator';
import { RouteSortObserver } from '@app/api/route/observer/route-sort-observer';

@Component({
  selector: 'order-button',
  templateUrl: './order-button.component.html',
  styleUrls: ['./order-button.component.sass']
})
export class OrderButtonComponent implements OnInit {

  @Input() property: string = '';

  @Input() direction: 'asc' | 'desc' | 'unsorted' = 'unsorted';

  private apiActuator: RouteApiActuator;

  private sortObserver: RouteSortObserver;

  constructor(
    router: Router,
    route: ActivatedRoute
  ) {
    this.apiActuator = new RouteApiActuator(router);
    this.sortObserver = new RouteSortObserver(route);
  }

  ngOnInit(): void {
    this.sortObserver.sort.subscribe(p => {
      if (p) {
        const propertySort = p.find(s => s.property === this.property);
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
