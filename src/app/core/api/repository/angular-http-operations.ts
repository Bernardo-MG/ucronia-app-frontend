import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { FailureResponse } from '../models/failure-response';
import { PaginationRequest } from '../models/pagination-request';
import { Sort } from '../models/sort';
import { HttpOperations } from './http-operations';

export class AngularHttpOperations implements HttpOperations {

  private _route = '';

  private _body: any | undefined = undefined;

  private _defaultSort: Sort<any>[] | undefined = undefined;

  protected options: {
    params?: HttpParams
  } = {};

  constructor(
    private http: HttpClient,
    private rootUrl: string
  ) { }

  public create<T>(): Observable<T> {
    const finalUrl = this.getFinalUrl(this._route);
    return this.http.post<T>(finalUrl, this._body, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public read<T>(): Observable<T> {
    const finalUrl = this.getFinalUrl(this._route);
    this.applyDefaultSort();
    return this.http.get<T>(finalUrl, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public update<T>(): Observable<T> {
    const finalUrl = this.getFinalUrl(this._route);
    return this.http.put<T>(finalUrl, this._body, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public delete<T>(): Observable<T> {
    const finalUrl = this.getFinalUrl(this._route);
    return this.http.delete<T>(finalUrl, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public body(body: any): AngularHttpOperations {
    this._body = body;

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

  public defaultSort(sort: Sort<any>[] | undefined): AngularHttpOperations {
    this._defaultSort = sort;

    return this;
  }

  public page(pagination: PaginationRequest | undefined): AngularHttpOperations {
    let params: HttpParams;
    let paged: boolean;

    if (pagination) {
      params = this.getHttpParams();

      paged = false;
      if (pagination.page) {
        // Pages start at 0
        params = params.set('page', pagination.page - 1);
        paged = true;
      }
      if (pagination.size) {
        params = params.set('size', pagination.size);
        paged = true;
      }

      if (paged) {
        this.options = { params: params };
      }

      this.sort(pagination.sort);
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

  private handleError(error: HttpErrorResponse) {
    let response: any;

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      response = new Error('Something bad happened; please try again later.');
    } else if (error.error.failures) {
      // Failures response
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      response = new FailureResponse();
      response.failures = error.error.failures;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      response = new Error('Something bad happened; please try again later.');
    }
    // Return an observable with a user-facing error message.
    return throwError(() => response);
  }

  private getFinalUrl(route: string) {
    return `${this.rootUrl}${route}`;
  }

  private applyDefaultSort() {
    if (!this.getHttpParams().has('sort')) {
      this.sort(this._defaultSort);
    }
  }

}
