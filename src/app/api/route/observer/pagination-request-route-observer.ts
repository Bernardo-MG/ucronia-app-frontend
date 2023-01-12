import { ActivatedRoute } from "@angular/router";
import { PaginationRequest } from "@app/api/models/pagination-request";
import { ParamsObserver } from "@app/route/observer/params-observer";
import { RouteParametersObserver } from "@app/route/observer/route-params-observer";
import { PaginationRequestParametersParser } from "./parser/pagination-request-parameters-parser";

export class PaginationRequestRouteObserver implements ParamsObserver<PaginationRequest> {

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