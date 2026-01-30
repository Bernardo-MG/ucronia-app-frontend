import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SimpleResponse } from '@bernardo-mg/request';
import { Month } from '@bernardo-mg/ui';
import { Setting, Transaction, TransactionCurrentBalance, TransactionMonthlyBalance, TransactionMonthsRange } from '@ucronia/domain';
import { addMinutes } from 'date-fns';
import { catchError, map, Observable } from 'rxjs';
import { TransactionUpdate } from '../../transaction/transaction-update';
import { ErrorRequestInterceptor } from '../error-request-interceptor';
import { SettingUpdate } from '../../setting/setting-update';

export class SettingEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public getAll(): Observable<Setting[]> {
    return this.http.get<SimpleResponse<Setting[]>>(`${this.apiUrl}/settings`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(
    code: string, 
    data: SettingUpdate
  ): Observable<Transaction> {
    return this.http.put<SimpleResponse<Transaction>>(`${this.apiUrl}/settings/${code}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}
