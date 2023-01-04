import { ActivatedRoute } from "@angular/router";
import { RouteParametersObserver } from "@app/route/observer/route-params-observer";
import { PaginationRequestParametersParser } from "./parser/pagination-request-parameters-parser";

export class PaginationRequestRouteObserver {

  private wrappedObserver;

  constructor(
    route: ActivatedRoute
  ) {
    this.wrappedObserver = new RouteParametersObserver(route, new PaginationRequestParametersParser());
  }

  public get subject() {
    return this.wrappedObserver.subject;
  }

}