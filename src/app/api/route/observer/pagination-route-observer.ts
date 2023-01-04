import { ActivatedRoute } from "@angular/router";
import { RouteParametersObserver } from "@app/route/observer/route-params-observer";
import { PaginationParametersReader } from "./reader/pagination-parameters-reader";

export class PaginationRouteObserver {

  private wrappedObserver;

  constructor(
    route: ActivatedRoute
  ) {
    this.wrappedObserver = new RouteParametersObserver(route, new PaginationParametersReader());
  }

  public get subject() {
    return this.wrappedObserver.subject;
  }

}