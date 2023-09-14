import { ActivatedRoute } from "@angular/router";
import { ParamsObserver } from "@app/shared/utils/route/observer/params-observer";
import { RouteParametersObserver } from "@app/shared/utils/route/observer/route-params-observer";
import { Active } from "../models/active";
import { ActiveParametersParser } from "./active-parameters-parser";

export class ActiveRouteObserver implements ParamsObserver<Active> {

  private wrappedObserver;

  constructor(
    route: ActivatedRoute
  ) {
    this.wrappedObserver = new RouteParametersObserver(route, new ActiveParametersParser());
  }

  public get subject() {
    return this.wrappedObserver.subject;
  }

}