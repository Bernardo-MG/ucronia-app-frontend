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

      const pagination = new Pagination();
      pagination.page = pageNumber;
      pagination.size = pageSize;

      this.pagination.next(pagination);
    });
  }

}