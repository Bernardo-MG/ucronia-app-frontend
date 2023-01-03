import { ParamMap } from "@angular/router";
import { Pagination } from "@app/api/models/pagination";
import { RouteParametersReader } from "@app/route/observer/route-parameters-reader";

export class RoutePaginationReader implements RouteParametersReader<Pagination> {

  constructor() { }

  public read(params: ParamMap): Pagination | undefined {
    const pageNumber = this.getPageNumber(params);
    const pageSize = this.getSizeNumber(params);

    let pagination;

    if ((pageNumber != undefined) && (pageNumber != undefined)) {
      pagination = new Pagination();

      if (pageNumber != undefined) {
        pagination.page = pageNumber;
      }
      if (pageSize != undefined) {
        pagination.size = pageSize;
      }
    } else {
      pagination = undefined;
    }

    return pagination;
  }

  private getPageNumber(params: ParamMap): number | undefined {
    return this.getNumber(params, 'page');
  }

  private getSizeNumber(params: ParamMap): number | undefined {
    return this.getNumber(params, 'size');
  }

  private getNumber(params: ParamMap, key: string): number | undefined {
    let pageNumber: number | undefined;

    if (params.has(key)) {
      pageNumber = Number(params.get(key));
    } else {
      pageNumber = undefined;
    }

    return pageNumber;
  }

}