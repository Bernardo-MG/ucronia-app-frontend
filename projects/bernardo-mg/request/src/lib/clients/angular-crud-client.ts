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
   * Route for the request. Will be built by the client.
   */
  private route = '';

  /**
   * Interceptor for error responses. Will generate an object which such response.
   */
  private errorInterceptor = new AngularErrorRequestInterceptor();

  /**
   * Request options. Used to store the params.
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

  private getFinalUrl() {
    return `${this.rootUrl}${this.route}`;
  }

}
