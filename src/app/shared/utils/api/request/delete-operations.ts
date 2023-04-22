import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '@app/core/api/models/api-response';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorResponse } from '../models/error-response';

export class DeleteOperations<T> {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  private identifier: number | undefined = undefined;

  private content: T | undefined = undefined;

  constructor(
    private http: HttpClient,
    private queryUrl: string
  ) { }

  public push(): Observable<ApiResponse<T>> {
    const options = {
      headers: this.headers,
      body: this.content
    };
    let url;
    if (this.identifier) {
      url = `${this.queryUrl}/${this.identifier}`;
    } else {
      url = this.queryUrl;
    }

    return this.http.delete<ApiResponse<T>>(url, options)
      .pipe(
        catchError(this.handleError())
      );
  }

  public id(id: number): DeleteOperations<T> {
    this.identifier = id;

    return this;
  }

  public body(content: any): DeleteOperations<T> {
    this.content = content;

    return this;
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
