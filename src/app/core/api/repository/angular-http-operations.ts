import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { PaginationRequest } from '../models/pagination-request';
import { Sort } from '../models/sort';
import { HttpOperations } from './http-operations';

export class AngularHttpOperations implements HttpOperations {

  private _route = '';

  private content: any | undefined = undefined;

  protected options: {
    params?: HttpParams
  } = {};

  constructor(
    private http: HttpClient,
    private rootUrl: string
  ) { }

  public create<T>(): Observable<T> {
    const finalUrl = this.getFinalUrl(this._route);
    return this.http.post<T>(finalUrl, this.content, this.options)
      .pipe(
        catchError(this.handleError())
      );
  }

  public read<T>(): Observable<T> {
    const finalUrl = this.getFinalUrl(this._route);
    return this.http.get<T>(finalUrl, this.options)
      .pipe(
        catchError(this.handleError())
      );
  }

  public update<T>(): Observable<T> {
    const finalUrl = this.getFinalUrl(this._route);
    return this.http.put<T>(finalUrl, this.content, this.options)
      .pipe(
        catchError(this.handleError())
      );
  }

  public delete<T>(): Observable<T> {
    const finalUrl = this.getFinalUrl(this._route);
    return this.http.delete<T>(finalUrl, this.options)
      .pipe(
        catchError(this.handleError())
      );
  }

  public body(content: any): AngularHttpOperations {
    this.content = content;

    return this;
  }

  public route(route: string): AngularHttpOperations {
    this._route = route;

    return this;
  }

  public appendRoute(route: string): AngularHttpOperations {
    this._route = `${this._route}${route}`;

    return this;
  }

  public parameter(name: string, value: any): AngularHttpOperations {
    let params: HttpParams;

    if (value) {
      params = this.getHttpParams();

      params = params.append(name, value);

      this.options = { params: params };
    }

    return this;
  }

  public sort(sort: Sort<any>[] | undefined): AngularHttpOperations {
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

  public page(pagination: PaginationRequest | undefined): AngularHttpOperations {
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
