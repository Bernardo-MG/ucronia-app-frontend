import { ActivatedRoute } from "@angular/router";
import { RouteParametersObserver } from "@app/route/observer/route-params-observer";
import { SortParametersReader } from "./reader/sort-parameters-reader";

export class SortRouteObserver {

  private wrappedObserver;

  constructor(
    route: ActivatedRoute
  ) {
    this.wrappedObserver = new RouteParametersObserver(route, new SortParametersReader());
  }

  public get subject() {
    return this.wrappedObserver.subject;
  }

}