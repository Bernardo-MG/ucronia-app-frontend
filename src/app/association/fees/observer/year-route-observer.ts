import { ActivatedRoute } from "@angular/router";
import { ParamsObserver } from "@app/shared/utils/route/observer/params-observer";
import { RouteParametersObserver } from "@app/shared/utils/route/observer/route-params-observer";
import { YearParametersParser } from "./year-parameters-parser";

export class YearRouteObserver implements ParamsObserver<number> {

  private wrappedObserver;

  constructor(
    route: ActivatedRoute
  ) {
    this.wrappedObserver = new RouteParametersObserver(route, new YearParametersParser());
  }

  public get subject() {
    return this.wrappedObserver.subject;
  }

}