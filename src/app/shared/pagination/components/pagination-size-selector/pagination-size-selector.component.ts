import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteApiActuator } from '@app/shared/utils/api/route/actuator/route-api-actuator';
import { PaginationRouteObserver } from '@app/shared/utils/api/route/observer/pagination-route-observer';
import { PaginationSizeSelectorTemplateComponent } from '../pagination-size-selector-template/pagination-size-selector-template.component';

@Component({
  selector: 'pagination-size-selector',
  standalone: true,
  imports: [PaginationSizeSelectorTemplateComponent],
  templateUrl: './pagination-size-selector.component.html'
})
export class PaginationSizeSelectorComponent implements OnInit {

  @Input() public sizes: number[] = [5, 10, 15, 20];

  @Input() public selected = 5;

  @Input() public disabled = false;

  private routeActuator: RouteApiActuator;

  private routePaginationObserver: PaginationRouteObserver;

  constructor(
    router: Router,
    route: ActivatedRoute
  ) {
    this.routeActuator = new RouteApiActuator(router);
    this.routePaginationObserver = new PaginationRouteObserver(route);
  }

  ngOnInit(): void {
    this.routePaginationObserver.subject.subscribe(p => {
      if ((p) && (p.size)) {
        this.selected = p.size;
      }
    });
  }

  public onSelect(size: number) {
    this.routeActuator.setPageSize(size);
  }

}
