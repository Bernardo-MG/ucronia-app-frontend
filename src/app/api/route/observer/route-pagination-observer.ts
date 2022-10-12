import { ActivatedRoute } from "@angular/router";
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
      let found = false;
      let pageNumber;
      if (params.has('page')) {
        pageNumber = Number(params.get('page'));
        found = true;
      } else {
        pageNumber = undefined;
      }

      let pageSize;
      if (params.has('size')) {
        pageSize = Number(params.get('size'));
        found = true;
      } else {
        pageSize = undefined;
      }

      let pageSort;
      let pageSortValue;
      if (params.has('sort')) {
        pageSortValue = params.get('sort');
        if(pageSortValue){
          pageSortValue = pageSortValue.split(',');
          pageSort = new Sort<any>(pageSortValue[0]);
          if(pageSortValue.length>1){
            if(pageSortValue[1] === 'desc'){
              pageSort.order = 'desc';
            } else {
              pageSort.order = 'asc';
            }
          }
        } else {
          pageSort = undefined;
        }
        found = true;
      } else {
        pageSort = undefined;
      }

      if (found) {
        const pagination = new PaginationRequest();
        pagination.page = pageNumber;
        pagination.size = pageSize;
        pagination.sort = pageSort;

        this.pagination.next(pagination);

        this.empty = false;
      }
    });
  }

}