import { ActivatedRoute, ParamMap } from "@angular/router";
import { PaginationRequest } from "@app/api/models/pagination-request";
import { Sort } from "@app/api/models/sort";
import { BehaviorSubject } from "rxjs";
import { RoutePaginationReader } from "./route-pagination-reader";

export class RoutePaginationObserver {

  public pagination = new BehaviorSubject<PaginationRequest>(new PaginationRequest());

  public empty: boolean = true;

  private reader = new RoutePaginationReader();

  constructor(
    route: ActivatedRoute
  ) {
    // Listens to route changes
    route.queryParamMap.subscribe(params => {
      const pageRequest = this.reader.readPagination(params);

      if (pageRequest) {
        this.pagination.next(pageRequest);

        this.empty = false;
      }
    });
  }

}