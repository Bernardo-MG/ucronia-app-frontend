import { ParamMap } from "@angular/router";
import { PaginationRequest } from "@app/api/models/pagination-request";
import { Sort } from "@app/api/models/sort";
import { RouteParametersReader } from "@app/route/observer/route-parameters-reader";
import { RouteSortReader } from "./route-sort-reader";

export class RoutePaginationRequestReader implements RouteParametersReader<PaginationRequest> {

  private sortReader = new RouteSortReader();

  constructor() { }

  public read(params: ParamMap): PaginationRequest | undefined {
    let request;

    if ((params.has('page')) || (params.has('size')) || (params.has('sort'))) {
      request = new PaginationRequest();

      if (params.has('page')) {
        request.page = Number(params.get('page'));
        if (Number.isNaN(request.page)) {
          // The page was not a number
          request.page = undefined;
        }
      }

      if (params.has('size')) {
        request.size = Number(params.get('size'));
        if (Number.isNaN(request.size)) {
          // The size was not a number
          request.size = undefined;
        }
      }

      if (params.has('sort')) {
        request.sort = this.sortReader.read(params);
      }
    } else {
      request = undefined;
    }

    return request;
  }

}