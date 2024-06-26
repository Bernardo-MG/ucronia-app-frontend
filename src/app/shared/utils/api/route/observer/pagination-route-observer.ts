import { ActivatedRoute } from "@angular/router";
import { ParamsObserver } from "@app/shared/utils/route/observer/params-observer";
import { RouteParametersObserver } from "@app/shared/utils/route/observer/route-params-observer";
import { PaginationParameter } from "./pagination-parameter";
import { PaginationParametersParser } from "./parser/pagination-parameters-parser";

export class PaginationRouteObserver implements ParamsObserver<PaginationParameter> {

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