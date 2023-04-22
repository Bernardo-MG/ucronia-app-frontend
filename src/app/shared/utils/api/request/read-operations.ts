import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ApiResponse } from '@app/core/api/models/api-response';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponse } from '../models/error-response';

export class ReadOperations<T> {

  protected options: {
    params?: HttpParams
  } = {};

  constructor(
    private http: HttpClient,
    private queryUrl: string
  ) { }

  public fetch(): Observable<ApiResponse<T[]>> {
    return this.http.get<ApiResponse<T[]>>(this.queryUrl, this.options)
      .pipe(
        catchError(this.handleError())
      );
  }

  public fetchOne(): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(this.queryUrl, this.options)
      .pipe(
        catchError(this.handleError())
      );
  }

  public parameter(name: string, value: any): ReadOperations<T> {
    let params: HttpParams;

    params = this.getHttpParams();

    params = params.append(name, value);

    this.options = { params: params };

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

      if (error.error) {
        const errorResponse: ErrorResponse = error.error;
        errorResponse.errors.forEach(e => console.error(e.message));
      }

      throw new Error(error.message);
    };
  }

}
