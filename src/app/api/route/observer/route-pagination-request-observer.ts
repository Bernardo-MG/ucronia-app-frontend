import { ActivatedRoute } from "@angular/router";
import { RouteParametersObserver } from "@app/route/observer/route-params-observer";
import { RoutePaginationRequestReader } from "./route-pagination-request-reader";

export class RoutePaginationRequestObserver {

  private wrappedObserver;

  constructor(
    route: ActivatedRoute
  ) {
    this.wrappedObserver = new RouteParametersObserver(route, new RoutePaginationRequestReader());
  }

  public get subject() {
    return this.wrappedObserver.subject;
  }

}