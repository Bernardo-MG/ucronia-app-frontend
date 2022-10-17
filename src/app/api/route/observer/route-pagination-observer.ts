import { ActivatedRoute } from "@angular/router";
import { Pagination } from "@app/api/models/pagination";
import { BehaviorSubject } from "rxjs";
import { RoutePaginationReader } from "./route-pagination-reader";

export class RoutePaginationObserver {

  public pagination = new BehaviorSubject<Pagination | undefined>(undefined);

  public empty: boolean = true;

  private reader = new RoutePaginationReader();

  constructor(
    route: ActivatedRoute
  ) {
    // Listens to route changes
    route.queryParamMap.subscribe(params => {
      const pageRequest = this.reader.read(params);

      this.pagination.next(pageRequest);
      if (pageRequest) {
        this.empty = false;
      }
    });
  }

}