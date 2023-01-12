import { ActivatedRoute } from "@angular/router";
import { Pagination } from "@app/api/models/pagination";
import { ParamsObserver } from "@app/route/observer/params-observer";
import { RouteParametersObserver } from "@app/route/observer/route-params-observer";
import { PaginationParametersParser } from "./parser/pagination-parameters-parser";

export class PaginationRouteObserver implements ParamsObserver<Pagination> {

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