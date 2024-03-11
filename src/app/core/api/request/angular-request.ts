import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { PaginatedQuery } from '../models/paginated-query';
import { Sort } from '../models/sort';
import { AngularErrorRequestInterceptor } from './angular-error-request-interceptor';
import { Request } from './request';

/**
 * Request implementation for Angular.
 */
export class AngularRequest implements Request {

  /**
   * Route for the request.
   */
  private route = '';

  /**
   * Interceptor for errors in the request. Will generate an error response.
   */
  private errorInterceptor = new AngularErrorRequestInterceptor();

  /**
   * Request options.
   */
  protected options: {
    params?: HttpParams
  } = {};

  constructor(
    private http: HttpClient,
    private rootUrl: string
  ) { }

  public create<T>(body: any): Observable<T> {
    const finalUrl = this.getFinalUrl();
    return this.http.post<T>(finalUrl, body, this.options)
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public read<T>(): Observable<T> {
    const finalUrl = this.getFinalUrl();
    return this.http.get<T>(finalUrl, this.options)
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public update<T>(body: any): Observable<T> {
    const finalUrl = this.getFinalUrl();
    return this.http.put<T>(finalUrl, body, this.options)
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public delete<T>(): Observable<T> {
    const finalUrl = this.getFinalUrl();
    return this.http.delete<T>(finalUrl, this.options)
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public patch<T>(body: any): Observable<T> {
    const finalUrl = this.getFinalUrl();
    return this.http.patch<T>(finalUrl, body, this.options)
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public appendRoute(route: string): AngularRequest {
    this.route = `${this.route}${route}`;

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

  public sort(toSort: Sort): AngularRequest {
    for (let i = 0; i < toSort.fields.length; i += 1) {
      const fieldSort = toSort.fields[i];
      this.parameter('sort', `${String(fieldSort.property)},${fieldSort.direction}`);
    }

    return this;
  }

  public query(query: PaginatedQuery): AngularRequest {
    // Sort
    this.sort(query.sort);

    // Other parameters
    for (const key in query.parameters) {
      const value = query.parameters[key];
      if (value) {
        this.parameter(key, value);
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

  private getFinalUrl() {
    return `${this.rootUrl}${this.route}`;
  }

}
