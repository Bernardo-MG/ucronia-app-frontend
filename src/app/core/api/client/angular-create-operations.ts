import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { CreateOperations } from './create-operations';

export class AngularCreateOperations implements CreateOperations {

  private _route = '';

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
    return this.http.post<T>(finalUrl, this.content, this.options)
      .pipe(
        catchError(this.handleError())
      );
  }

  public body(content: any): CreateOperations {
    this.content = content;

    return this;
  }

  public route(route: string): CreateOperations {
    this._route = route;

    return this;
  }

  public appendRoute(route: string): CreateOperations {
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
    return `${this.rootUrl}${route}`;
  }

}
