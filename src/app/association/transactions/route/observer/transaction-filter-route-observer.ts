import { ActivatedRoute } from "@angular/router";
import { ParamsObserver } from "@app/route/observer/params-observer";
import { RouteParametersObserver } from "@app/route/observer/route-params-observer";
import { TransactionFilter } from "../../models/transaction-filter";
import { TransactionFilterParser } from "./transaction-filter-parser";

export class TransactionFilterRouteObserver implements ParamsObserver<TransactionFilter> {

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