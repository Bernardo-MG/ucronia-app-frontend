import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AngularErrorRequestInterceptor } from '../interceptors/angular-error-request-interceptor';
import { ParamLoader } from '../params/param-loader';
import { CrudClient } from './crud-client';

/**
 * Client implementation for Angular.
 */
export class AngularCrudClient implements CrudClient {

  /**
   * Request options. Used to store the params.
   */
  protected options: {
    params?: HttpParams
  } = {};

  constructor(
    private http: HttpClient,
    private route: string,
    private errorInterceptor: AngularErrorRequestInterceptor = new AngularErrorRequestInterceptor()
  ) { }

  public create<T>(body: any): Observable<T> {
    return this.http.post<T>(this.route, body, this.options)
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public read<T>(): Observable<T> {
    return this.http.get<T>(this.route, this.options)
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public update<T>(body: any): Observable<T> {
    return this.http.put<T>(this.route, body, this.options)
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public delete<T>(): Observable<T> {
    return this.http.delete<T>(this.route, this.options)
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public patch<T>(body: any): Observable<T> {
    return this.http.patch<T>(this.route, body, this.options)
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public appendRoute(route: string): AngularCrudClient {
    this.route = `${this.route}${route}`;

    return this;
  }

  public parameter(name: string, value: any): AngularCrudClient {
    let params: HttpParams;

    if (value) {
      params = this.getHttpParams();

      params = params.append(name, value);

      this.options = { ...this.options, params: params };
    }

    return this;
  }

  public loadParameters(parameters: ParamLoader): AngularCrudClient {
    parameters.load(this.parameter.bind(this));

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

}
