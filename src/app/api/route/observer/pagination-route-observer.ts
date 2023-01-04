import { ActivatedRoute } from "@angular/router";
import { RouteParametersObserver } from "@app/route/observer/route-params-observer";
import { PaginationParametersParser } from "./parser/pagination-parameters-parser";

export class PaginationRouteObserver {

  private wrappedObserver;

  constructor(
    route: ActivatedRoute
  ) {
    this.wrappedObserver = new RouteParametersObserver(route, new PaginationParametersParser());
  }

  public get subject() {
    return this.wrappedObserver.subject;
  }

}