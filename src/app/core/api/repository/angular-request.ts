import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { FailureResponse } from '../models/failure-response';
import { PaginationRequest } from '../models/pagination-request';
import { Sort } from '../models/sort';
import { Request } from './request';

export class AngularRequest implements Request {

  private _route = '';

  private _body: any | undefined = undefined;

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

  public body(body: any): AngularRequest {
    this._body = body;

    return this;
  }

  public route(route: string): AngularRequest {
    this._route = route;

    return this;
  }

  public appendRoute(route: string): AngularRequest {
    this._route = `${this._route}${route}`;

    return this;
  }

  public parameter(name: string, value: any): AngularRequest {
    let params: HttpParams;

    if (value) {
      params = this.getHttpParams();

      params = params.append(name, value);

      this.options = { params: params };
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

}
