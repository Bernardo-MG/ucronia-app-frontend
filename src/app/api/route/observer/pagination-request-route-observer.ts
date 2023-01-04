import { ActivatedRoute } from "@angular/router";
import { RouteParametersObserver } from "@app/route/observer/route-params-observer";
import { PaginationRequestParametersReader } from "./reader/pagination-request-parameters-reader";

export class PaginationRequestRouteObserver {

  private wrappedObserver;

  constructor(
    route: ActivatedRoute
  ) {
    this.wrappedObserver = new RouteParametersObserver(route, new PaginationRequestParametersReader());
  }

  public get subject() {
    return this.wrappedObserver.subject;
  }

}