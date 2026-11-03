import { HttpClient } from '@angular/common/http';
import { ErrorRequestInterceptor, SimpleResponse } from '@bernardo-mg/request';
import { catchError, map, Observable } from 'rxjs';

export class TransactionTypeEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public create(data: { description: string; color: string }): Observable<TransactionType> {
    return this.http.post<SimpleResponse<TransactionType>>(`${this.apiUrl}/transaction/type`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}

interface TransactionType {
  number: number;
  description: string;
  color: string;
}
