import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReadOperations } from './read-operations';

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

    params = this.getHttpParams();

    params = params.append(name, value);

    this.options = { params: params };

    return this;
  }

  public appendRoute(route: string): ReadOperations {
    this._route = `${this._route}${route}`;

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
