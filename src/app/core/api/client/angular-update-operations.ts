import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { UpdateOperations } from './update-operations';

export class AngularUpdateOperations implements UpdateOperations {

  private _route = '';

  private identifier: number | undefined = undefined;

  private content: any | undefined = undefined;

  protected options: {
    params?: HttpParams
  } = {};

  constructor(
    private http: HttpClient,
    private rootUrl: string
  ) { }

  public push<T>(): Observable<T> {
    const finalUrl = this.getFinalUrl(this._route);
    return this.http.put<T>(finalUrl, this.content, this.options)
      .pipe(
        catchError(this.handleError())
      );
  }

  id(id: number): UpdateOperations {
    this.identifier = id;

    return this;
  }

  public body(content: any): UpdateOperations {
    this.content = content;

    return this;
  }

  public route(route: string): UpdateOperations {
    this._route = route;

    return this;
  }

  public appendRoute(route: string): UpdateOperations {
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
