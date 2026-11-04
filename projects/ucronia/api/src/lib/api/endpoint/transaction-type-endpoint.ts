import { HttpClient } from '@angular/common/http';
import { ErrorRequestInterceptor, Page, SimpleResponse } from '@bernardo-mg/request';
import { TransactionType } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';

export class TransactionTypeEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(page = 1, size = 10): Observable<Page<TransactionType>> {
    return this.http.get<Page<TransactionType>>(`${this.apiUrl}/transaction/type`, {
      params: { page, size, sort: 'number|asc' }
    }).pipe(catchError(this.errorInterceptor.handle));
  }

  public get(number: number): Observable<TransactionType> {
    return this.http.get<SimpleResponse<TransactionType>>(`${this.apiUrl}/transaction/type/${number}`)
      .pipe(catchError(this.errorInterceptor.handle), map(response => response.content));
  }

  public update(number: number, data: { description: string; color: string }): Observable<TransactionType> {
    return this.http.put<SimpleResponse<TransactionType>>(`${this.apiUrl}/transaction/type/${number}`, data)
      .pipe(catchError(this.errorInterceptor.handle), map(response => response.content));
  }

  public create(data: { description: string; color: string }): Observable<TransactionType> {
    return this.http.post<SimpleResponse<TransactionType>>(`${this.apiUrl}/transaction/type`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}
