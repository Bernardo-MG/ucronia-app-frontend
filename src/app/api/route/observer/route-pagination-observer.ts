import { ActivatedRoute } from "@angular/router";
import { RouteParametersObserver } from "@app/route/observer/route-params-observer";
import { RoutePaginationReader } from "./route-pagination-reader";

export class RoutePaginationObserver {

  private wrappedObserver;

  constructor(
    route: ActivatedRoute
  ) {
    this.wrappedObserver = new RouteParametersObserver(route, new RoutePaginationReader());
  }

  public get subject() {
    return this.wrappedObserver.subject;
  }

}