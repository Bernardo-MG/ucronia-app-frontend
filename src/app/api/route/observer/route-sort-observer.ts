import { ActivatedRoute } from "@angular/router";
import { RouteParametersObserver } from "@app/route/observer/route-params-observer";
import { RouteSortReader } from "./route-sort-reader";

export class RouteSortObserver {

  private wrappedObserver;

  constructor(
    route: ActivatedRoute
  ) {
    this.wrappedObserver = new RouteParametersObserver(route, new RouteSortReader());
  }

  public get subject() {
    return this.wrappedObserver.subject;
  }

}