import { ActivatedRoute } from "@angular/router";
import { RouteParametersObserver } from "@app/route/observer/route-params-observer";
import { SortParametersParser } from "./parser/sort-parameters-parser";

export class SortRouteObserver {

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