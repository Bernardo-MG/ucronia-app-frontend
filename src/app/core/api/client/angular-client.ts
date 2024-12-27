import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AngularErrorRequestInterceptor } from './angular-error-request-interceptor';
import { Client } from './client';
import { ParamLoader } from './param-loader';

/**
 * Request implementation for Angular.
 */
export class AngularClient implements Client {

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

  public appendRoute(route: string): AngularClient {
    this.route = `${this.route}${route}`;

    return this;
  }

  public parameter(name: string, value: any): AngularClient {
    let params: HttpParams;

    if (value) {
      params = this.getHttpParams();

      params = params.append(name, value);

      this.options = { params: params };
    }

    return this;
  }

  public loadParameters(parameters: ParamLoader): AngularClient {
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
