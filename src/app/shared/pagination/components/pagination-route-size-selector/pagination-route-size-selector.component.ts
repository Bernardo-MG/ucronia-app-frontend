import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteApiActuator } from '@app/shared/utils/api/route/actuator/route-api-actuator';
import { PaginationRouteObserver } from '@app/shared/utils/api/route/observer/pagination-route-observer';
import { PaginationSizeSelectorTemplateComponent } from '../pagination-size-selector-template/pagination-size-selector-template.component';

@Component({
  selector: 'pagination-route-size-selector',
  imports: [PaginationSizeSelectorTemplateComponent],
  templateUrl: './pagination-route-size-selector.component.html'
})
export class PaginationSizeSelectorComponent {

  @Input() public sizes: number[] = [5, 10, 15, 20];

  @Input() public selected = 5;

  @Input() public disabled = false;

  private readonly routeActuator: RouteApiActuator;

  constructor() {
    const router = inject(Router);
    const route = inject(ActivatedRoute);

    this.routeActuator = new RouteApiActuator(router);
    new PaginationRouteObserver(route).subject.subscribe(p => {
      if ((p) && (p.size)) {
        this.selected = p.size;
      }
    });
  }

  public onSelect(size: number) {
    this.routeActuator.setPageSize(size);
  }

}
