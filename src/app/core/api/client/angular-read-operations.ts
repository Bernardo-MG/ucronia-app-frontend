import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReadOperations } from './read-operations';
import { Sort } from '@app/shared/utils/api/models/sort';
import { PaginationRequest } from '@app/shared/utils/api/models/pagination-request';

export class AngularReadOperations implements ReadOperations {

  private _route = '';

  protected options: {
    params?: HttpParams
  } = {};

  constructor(
    private http: HttpClient,
    private rootUrl: string
  ) { }

  public fetch<T>(): Observable<T> {
    const finalUrl = this.getFinalUrl(this._route);
    return this.http.get<T>(finalUrl, this.options)
      .pipe(
        catchError(this.handleError())
      );
  }

  public route(route: string): ReadOperations {
    this._route = route;

    return this;
  }

  public parameter(name: string, value: any): ReadOperations {
    let params: HttpParams;

    if (value) {
      params = this.getHttpParams();

      params = params.append(name, value);

      this.options = { params: params };
    }

    return this;
  }

  public appendRoute(route: string): ReadOperations {
    this._route = `${this._route}${route}`;

    return this;
  }

  public sort(sort: Sort<any>[] | undefined): ReadOperations {
    let params: HttpParams;

    if (sort) {
      params = this.getHttpParams();

      for (let i = 0; i < sort.length; i += 1) {
        const fieldSort = sort[i];
        params = params.append('sort', `${String(fieldSort.property)},${fieldSort.order}`);
      }

      this.options = { params: params };
    }

    return this;
  }

  public page(pagination: PaginationRequest | undefined): ReadOperations {
    let params: HttpParams;
    let paged: boolean;

    if (pagination) {
      params = this.getHttpParams();

      paged = false;
      if (pagination.page) {
        params = params.set('page', pagination.page);
        paged = true;
      }
      if (pagination.size) {
        params = params.set('size', pagination.size);
        paged = true;
      }

      if (paged) {
        this.options = { params: params };
      }
    }

    return this;
  }

  private getHttpParams(): HttpParams {
    let params: HttpParams;

    if (this.options.params) {
      params = this.options.params;
    } else {
      params = new HttpParams();
      this.options = { params: params };
    }

    return params;
  }

  private handleError() {
    return (error: HttpErrorResponse) => {

      console.error(error.message);

      throw new Error(error.message);
    };
  }

  private getFinalUrl(route: string) {
    return `${this.rootUrl}${route}`;
  }

}
