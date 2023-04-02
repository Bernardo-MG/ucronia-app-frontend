import { ActivatedRoute } from "@angular/router";
import { ParamsObserver } from "../observer/params-observer";
import { RouteParametersObserver } from "../observer/route-params-observer";
import { DateParametersParser } from "./date-parameters-parser";

export class DateRouteObserver implements ParamsObserver<Date> {

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