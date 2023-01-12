import { ActivatedRoute } from "@angular/router";
import { Sort } from "@app/api/models/sort";
import { ParamsObserver } from "@app/route/observer/params-observer";
import { RouteParametersObserver } from "@app/route/observer/route-params-observer";
import { SortParametersParser } from "./parser/sort-parameters-parser";

export class SortRouteObserver implements ParamsObserver<Sort<any>[]> {

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