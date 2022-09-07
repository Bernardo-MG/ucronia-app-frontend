import { ActivatedRoute } from "@angular/router";
import { Pagination } from "@app/api/models/pagination";
import { ReplaySubject } from "rxjs";

export class RoutePaginationObserver {

  public pagination = new ReplaySubject<Pagination>();

  constructor(
    route: ActivatedRoute
  ) {

    // Listens to route changes
    route.queryParamMap.subscribe(params => {
      let pageNumber;
      if (params.has('page')) {
        pageNumber = Number(params.get('page'));
      } else {
        pageNumber = 0;
      }

      let pageSize;
      if (params.has('size')) {
        pageSize = Number(params.get('size'));
      } else {
        pageSize = 0;
      }

      const pagination = new Pagination();
      pagination.page = pageNumber;
      pagination.size = pageSize;

      this.pagination.next(pagination);
    });
  }

}