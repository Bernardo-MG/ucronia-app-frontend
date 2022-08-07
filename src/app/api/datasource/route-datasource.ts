import { ActivatedRoute } from "@angular/router";
import { ApiRequest } from '@app/api/models/api-request';
import { Endpoint } from "@app/api/models/endpoint";
import { PageInfo } from "@app/api/models/page-info";
import { Pagination } from "@app/api/models/pagination";
import { ReplaySubject, tap } from "rxjs";

export class RouteDatasource<T> {

  public data = new ReplaySubject<T[]>();

  public pageInfo = new ReplaySubject<PageInfo>();

  private currentPage: number = 0;

  private sortProperty: string | null | undefined;

  private order: 'asc' | 'desc' = 'asc';

  constructor(
    route: ActivatedRoute,
    private endpoint: Endpoint<T>
  ) {

    // Initialized with route parameters
    route.queryParamMap.subscribe(params => {
      let pageNumber;
      if (params.has('page')) {
        pageNumber = Number(params.get('page'));
      } else {
        pageNumber = 0;
      }
      this.currentPage = pageNumber;

      let sortProperty;
      if (params.has('property')) {
        sortProperty = params.get('property');
      } else {
        sortProperty = undefined;
      }
      this.sortProperty = sortProperty;

      if (this.sortProperty) {
        let order: any;
        if (params.has('order')) {
          order = String(params.get('order'));
        } else {
          order = 'asc';
        }
        this.order = order;
      }

      this.fetch(undefined);
    });
  }

  public fetch(query: any) {
    const page: Pagination = {
      page: this.currentPage,
      size: 20
    }

    let sort;
    if (this.sortProperty) {
      sort = {
        property: this.sortProperty,
        order: this.order
      }
    } else {
      sort = undefined;
    }


    const request: ApiRequest<T> = {
      pagination: page,
      search: query
    }
    if (sort) {
      request.sort = <any>sort;
    }

    this.endpoint(request)
      .pipe(tap(r => this.data.next(r.content)))
      .pipe(tap(r => this.pageInfo.next(r)))
      .subscribe();
  }

}