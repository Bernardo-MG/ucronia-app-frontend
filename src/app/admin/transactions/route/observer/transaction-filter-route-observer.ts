import { ActivatedRoute } from "@angular/router";
import { RouteParametersObserver } from "@app/route/observer/route-params-observer";
import { TransactionFilterParser } from "./transaction-filter-parser";

export class TransactionFilterRouteObserver {

  private wrappedObserver;

  constructor(
    route: ActivatedRoute
  ) {
    this.wrappedObserver = new RouteParametersObserver(route, new TransactionFilterParser());
  }

  public get subject() {
    return this.wrappedObserver.subject;
  }

}