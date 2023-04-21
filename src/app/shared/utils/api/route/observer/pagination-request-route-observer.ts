import { ActivatedRoute } from "@angular/router";
import { ParamsObserver } from "@app/shared/utils/route/observer/params-observer";
import { RouteParametersObserver } from "@app/shared/utils/route/observer/route-params-observer";
import { PaginationRequest } from "../../models/pagination-request";
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