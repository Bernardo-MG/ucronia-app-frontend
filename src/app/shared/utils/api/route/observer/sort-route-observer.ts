import { ActivatedRoute } from "@angular/router";
import { ParamsObserver } from "@app/shared/utils/route/observer/params-observer";
import { RouteParametersObserver } from "@app/shared/utils/route/observer/route-params-observer";
import { Sort } from "../../../../../core/api/models/sort";
import { SortParametersParser } from "./parser/sort-parameters-parser";

export class SortRouteObserver implements ParamsObserver<Sort[]> {

  private wrappedObserver;

  constructor(
    route: ActivatedRoute
  ) {
    this.wrappedObserver = new RouteParametersObserver(route, new SortParametersParser());
  }

  public get subject() {
    return this.wrappedObserver.subject;
  }

}