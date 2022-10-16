import { ParamMap } from "@angular/router";
import { PaginationRequest } from "@app/api/models/pagination-request";
import { Sort } from "@app/api/models/sort";

export class RoutePaginationReader {

  constructor() { }

  public readPagination(params: ParamMap): PaginationRequest | undefined {
    // TODO: Extract. This methods should be private for this class
    const pageNumber = this.getPageNumber(params);
    const pageSize = this.getSizeNumber(params);
    const pageSort = this.getSort(params);

    let pagination;
    if ((pageNumber != null) || (pageSize != null) || (pageSort != null)) {
      pagination = new PaginationRequest();
      pagination.page = pageNumber;
      pagination.size = pageSize;
      pagination.sort = pageSort;
    } else {
      pagination = undefined;
    }

    return pagination;
  }

  private getPageNumber(params: ParamMap): number | undefined {
    let pageNumber: number | undefined;

    if (params.has('page')) {
      pageNumber = Number(params.get('page'));
    } else {
      pageNumber = undefined;
    }

    return pageNumber;
  }

  private getSizeNumber(params: ParamMap): number | undefined {
    let pageNumber: number | undefined;

    if (params.has('size')) {
      pageNumber = Number(params.get('size'));
    } else {
      pageNumber = undefined;
    }

    return pageNumber;
  }

  private getSort(params: ParamMap): Sort<any>[] | undefined {
    let pageSort: Sort<any>;
    let pageSorts: Sort<any>[] | undefined;
    let pageSortValues: string[] | null;

    if (params.has('sort')) {
      pageSorts = [];
      pageSortValues = params.getAll('sort');
      for (var i = 0; i < pageSortValues.length; i += 1) {
        const pageSortValue = pageSortValues[i];
        if (pageSortValue) {
          pageSort = this.getSortFromValue(pageSortValue);
          pageSorts.push(pageSort);
        }
      }
    } else {
      pageSorts = undefined;
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