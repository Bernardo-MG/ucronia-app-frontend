import { ActivatedRoute } from "@angular/router";
import { PaginationRequest } from "@app/api/models/pagination-request";
import { BehaviorSubject } from "rxjs";
import { RoutePaginationRequestReader } from "./route-pagination-request-reader";

export class RoutePaginationRequestObserver {

  public pagination = new BehaviorSubject<PaginationRequest | undefined>(undefined);

  public empty: boolean = true;

  private reader = new RoutePaginationRequestReader();

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