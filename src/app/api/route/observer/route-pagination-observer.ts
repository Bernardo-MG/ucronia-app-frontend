import { ActivatedRoute, ParamMap } from "@angular/router";
import { PaginationRequest } from "@app/api/models/pagination-request";
import { Sort } from "@app/api/models/sort";
import { ReplaySubject } from "rxjs";

export class RoutePaginationObserver {

  public pagination = new ReplaySubject<PaginationRequest>();

  public empty: boolean = true;

  constructor(
    route: ActivatedRoute
  ) {

    // Listens to route changes
    route.queryParamMap.subscribe(params => {
      const pageNumber = this.getPageNumber(params);
      const pageSize = this.getSizeNumber(params);
      const pageSort = this.getSort(params);

      if ((pageNumber) || (pageSize) || (pageSort)) {
        const pagination = new PaginationRequest();
        pagination.page = pageNumber;
        pagination.size = pageSize;
        pagination.sort = pageSort;

        this.pagination.next(pagination);

        this.empty = false;
      }
    });
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

  private getSort(params: ParamMap): Sort<any> | undefined {
    let pageSort: Sort<any> | undefined;
    let pageSortValue: string | null;
    let pageSortPair: string[];
    let property: string;
    let direction: string;

    if (params.has('sort')) {
      pageSortValue = params.get('sort');
      if (pageSortValue) {
        pageSortPair = pageSortValue.split(',');
        property = pageSortPair[0];
        pageSort = new Sort<any>(property);

        if (pageSortPair.length > 1) {
          direction = pageSortPair[1];
          if ((direction === 'desc') || (direction === 'asc')) {
            pageSort.order = direction;
          }
        }
      } else {
        pageSort = undefined;
      }
    } else {
      pageSort = undefined;
    }

    return pageSort;
  }

}