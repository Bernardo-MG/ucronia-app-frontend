import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';
import { ErrorResponse } from '../models/error-response';

export class DeleteOperations<T> {

  private identifier: number = -1;

  constructor(
    private http: HttpClient,
    private queryUrl: string
  ) { }

  public push(): Observable<ApiResponse<T>> {
    const url = `${this.queryUrl}/${this.identifier}`;
    return this.http.delete<ApiResponse<T>>(url).pipe(
      map((response: ApiResponse<T>) => { return response })
    ).pipe(
      catchError(this.handleError())
    );
  }

  public pushUnwrapped(): Observable<T> {
    // TODO: add unwrap operation to be used after fetch
    return this.push().pipe(map(r => r.content));
  }

  public id(id: number): DeleteOperations<T> {
    this.identifier = id;

    return this;
  }

  private handleError() {
    return (error: HttpErrorResponse) => {

      console.error(error.message);

      if(error.error){
        const errorResponse: ErrorResponse = error.error;
        errorResponse.errors.forEach(e => console.error(e.message));
      }

      throw new Error(error.message);
    };
  }

}
