import { ParamMap } from "@angular/router";
import { PaginationRequest } from "@app/api/models/pagination-request";
import { Sort } from "@app/api/models/sort";
import { RouteParametersReader } from "@app/route/observer/route-parameters-reader";

export class RoutePaginationRequestReader implements RouteParametersReader<PaginationRequest> {

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
        request.sort = this.getSort(params);
        if(request.sort.length === 0){
          // No valid sort argument
          request.sort = undefined;
        }
      }
    } else {
      request = undefined;
    }

    return request;
  }

  private getSort(params: ParamMap): Sort<any>[] {
    let pageSort: Sort<any>;
    let pageSorts: Sort<any>[] | undefined;
    let pageSortValues: string[] | null;

    pageSorts = [];
    pageSortValues = params.getAll('sort');
    for (var i = 0; i < pageSortValues.length; i += 1) {
      const pageSortValue = pageSortValues[i];
      if (pageSortValue) {
        pageSort = this.getSortFromValue(pageSortValue);
        if (pageSort.property) {
          pageSorts.push(pageSort);
        }
      }
    }

    return pageSorts;
  }

  private getSortFromValue(pageSortValue: string): Sort<any> {
    let pageSortPair: string[];
    let pageSort: Sort<any> | undefined;
    let property: string;
    let direction: string;

    pageSortPair = pageSortValue.split(',');
    property = pageSortPair[0];
    pageSort = new Sort<any>(property);

    if (pageSortPair.length > 1) {
      direction = pageSortPair[1];
      if ((direction === 'desc') || (direction === 'asc')) {
        pageSort.order = direction;
      }
    }

    return pageSort;
  }

}