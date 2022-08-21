import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';

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

  public id(id: number): DeleteOperations<T> {
    this.identifier = id;

    return this;
  }

  private handleError() {
    return (error: any) => {

      console.error(error);

      throw new Error(error);
    };
  }

}
