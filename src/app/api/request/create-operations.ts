import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';
import { ErrorResponse } from '../models/error-response';

export class CreateOperations<T> {

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private content: T | undefined = undefined;

  constructor(
    private http: HttpClient,
    private queryUrl: string
  ) { }

  public push(): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(this.queryUrl, this.content, this.options).pipe(
      map((response: ApiResponse<T>) => { return response })
    ).pipe(
      catchError(this.handleError())
    );
  }

  public body(content: T): CreateOperations<T> {
    this.content = content;

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
