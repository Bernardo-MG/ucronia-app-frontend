import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';

export class UpdateOperations<T> {

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private identifier: number = -1;

  private content: T | undefined = undefined;

  constructor(
    private http: HttpClient,
    private queryUrl: string
  ) { }

  public push(): Observable<ApiResponse<T>> {
    const url = `${this.queryUrl}/${this.identifier}`;
    return this.http.put<ApiResponse<T>>(url, this.content, this.options).pipe(
      map((response: ApiResponse<T>) => { return response })
    ).pipe(
      catchError(this.handleError())
    );
  }

  public id(id: number): UpdateOperations<T> {
    this.identifier = id;

    return this;
  }

  public body(content: T): UpdateOperations<T> {
    this.content = content;
    
    return this;
  }

  private handleError() {
    return (error: any) => {

      console.error(error);

      throw new Error(error);
    };
  }

}
