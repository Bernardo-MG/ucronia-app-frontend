import { ActivatedRoute } from "@angular/router";
import { RouteParametersObserver } from "@app/route/observer/route-params-observer";
import { DateParametersParser } from "./date-parameters-parser";

export class DateRouteObserver {

  private wrappedObserver;

  constructor(
    route: ActivatedRoute
  ) {
    this.wrappedObserver = new RouteParametersObserver(route, new DateParametersParser());
  }

  public get subject() {
    return this.wrappedObserver.subject;
  }

}