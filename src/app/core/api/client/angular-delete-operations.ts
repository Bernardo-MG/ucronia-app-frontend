import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { DeleteOperations } from './delete-operations';

export class AngularDeleteOperations implements DeleteOperations {

  private _route = '';

  private identifier: number | undefined = undefined;

  protected options: {
    params?: HttpParams
  } = {};

  constructor(
    private http: HttpClient,
    private rootUrl: string
  ) { }

  public push<T>(): Observable<T> {
    const finalUrl = this.getFinalUrl(this._route);
    return this.http.delete<T>(finalUrl, this.options)
      .pipe(
        catchError(this.handleError())
      );
  }

  public id(id: number): DeleteOperations {
    this.identifier = id;

    return this;
  }

  public route(route: string): DeleteOperations {
    this._route = route;

    return this;
  }

  public appendRoute(route: string): DeleteOperations {
    this._route = `${this._route}${route}`;

    return this;
  }

  private handleError() {
    return (error: HttpErrorResponse) => {

      console.error(error.message);

      throw new Error(error.message);
    };
  }

  private getFinalUrl(route: string) {
    let url;

    if (this.identifier) {
      url = `${this.rootUrl}${route}/${this.identifier}`;
    } else {
      url = `${this.rootUrl}${route}`
    }

    return url;
  }

}
