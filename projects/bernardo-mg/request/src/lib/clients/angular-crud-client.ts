import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AngularErrorRequestInterceptor } from '../interceptors/angular-error-request-interceptor';
import { ParamLoader } from '../params/param-loader';
import { CrudClient } from './crud-client';

/**
 * Client implementation for Angular.
 */
export class AngularCrudClient implements CrudClient {

  constructor(
    private readonly http: HttpClient,
    private readonly route: string,
    private readonly errorInterceptor: AngularErrorRequestInterceptor,
    private readonly options: { params?: HttpParams } = {}
  ) {
    this.errorInterceptor.handle = this.errorInterceptor.handle.bind(this.errorInterceptor);
  }

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
    return new AngularCrudClient(this.http, `${this.route}${route}`, this.errorInterceptor, { ...this.options });
  }

  public parameter(name: string, value: string | number | boolean | undefined): AngularCrudClient {
    let params = this.getHttpParams();

    if (value !== undefined && value !== null) {
      params = params.append(name, value);
    }

    return new AngularCrudClient(this.http, this.route, this.errorInterceptor, { ...this.options, params: params });
  }

  public loadParameters(parameters: ParamLoader): AngularCrudClient {
    let params = this.getHttpParams();

    parameters.load((key, value) => {
      if (value !== undefined && value !== null) {
        params = params.append(key, value);
      }
    });

    return new AngularCrudClient(this.http, this.route, this.errorInterceptor, { ...this.options, params: params });
  }

  private getHttpParams(): HttpParams {
    return this.options.params || new HttpParams();
  }

}
