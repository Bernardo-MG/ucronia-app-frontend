import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { PaginatedQuery } from '../models/paginated-query';
import { Sort } from '../models/sort';
import { AngularErrorRequestInterceptor } from './angular-error-request-interceptor';
import { Request } from './request';

export class AngularRequest implements Request {

  private route = '';

  private errorInteceptor = new AngularErrorRequestInterceptor();

  protected options: {
    params?: HttpParams
  } = {};

  constructor(
    private http: HttpClient,
    private rootUrl: string
  ) { }

  public create<T>(body: any): Observable<T> {
    const finalUrl = this.getFinalUrl(this.route);
    return this.http.post<T>(finalUrl, body, this.options)
      .pipe(
        catchError(this.errorInteceptor.handle)
      );
  }

  public read<T>(): Observable<T> {
    const finalUrl = this.getFinalUrl(this.route);
    return this.http.get<T>(finalUrl, this.options)
      .pipe(
        catchError(this.errorInteceptor.handle)
      );
  }

  public update<T>(body: any): Observable<T> {
    const finalUrl = this.getFinalUrl(this.route);
    return this.http.put<T>(finalUrl, body, this.options)
      .pipe(
        catchError(this.errorInteceptor.handle)
      );
  }

  public delete<T>(): Observable<T> {
    const finalUrl = this.getFinalUrl(this.route);
    return this.http.delete<T>(finalUrl, this.options)
      .pipe(
        catchError(this.errorInteceptor.handle)
      );
  }

  public patch<T>(body: any): Observable<T> {
    const finalUrl = this.getFinalUrl(this.route);
    return this.http.patch<T>(finalUrl, body, this.options)
      .pipe(
        catchError(this.errorInteceptor.handle)
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

  public sort(sort: Sort[]): AngularRequest {
    for (let i = 0; i < sort.length; i += 1) {
      const fieldSort = sort[i];
      this.parameter('sort', `${String(fieldSort.property)},${fieldSort.direction}`);
    }

    return this;
  }

  public query(query: PaginatedQuery<any>): AngularRequest {
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

  private getFinalUrl(route: string) {
    return `${this.rootUrl}${route}`;
  }

}
