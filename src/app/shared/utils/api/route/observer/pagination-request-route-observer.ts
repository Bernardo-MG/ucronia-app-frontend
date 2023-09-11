import { ActivatedRoute } from "@angular/router";
import { ParamsObserver } from "@app/shared/utils/route/observer/params-observer";
import { RouteParametersObserver } from "@app/shared/utils/route/observer/route-params-observer";
import { PaginationRequest } from "../../../../../core/api/models/pagination-request";
import { PaginationRequestParametersParser } from "./parser/pagination-request-parameters-parser";

export class PaginationRequestRouteObserver implements ParamsObserver<PaginationRequest> {

  private wrappedObserver;

  constructor(
    route: ActivatedRoute
  ) {
    // FIXME: This is reacting to all changes in the route, not just pagination, when there is a pagination parameter
    this.wrappedObserver = new RouteParametersObserver(route, new PaginationRequestParametersParser());
  }

  public get subject() {
    return this.wrappedObserver.subject;
  }

}