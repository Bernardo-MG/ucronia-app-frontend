import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularCrudClient, CrudClient, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { TransactionCurrentBalance } from '../../../../models/transactions/transaction-current-balance';
import { TransactionMonthlyBalance } from '../../../../models/transactions/transaction-monthly-balance';

@Injectable({
  providedIn: "root"
})
export class TransactionBalanceService {

  constructor(
    private http: HttpClient
  ) { }

  public current(): Observable<TransactionCurrentBalance> {
    return this.getClient()
      .read<SimpleResponse<TransactionCurrentBalance>>()
      .pipe(map(r => r.content));
  }

  public monthly(startDate: string | undefined, endDate: string | undefined): Observable<TransactionMonthlyBalance[]> {
    return this.getMonthlyClient()
      .parameter('startDate', startDate)
      .parameter('endDate', endDate)
      .read<SimpleResponse<TransactionMonthlyBalance[]>>()
      .pipe(map(r => r.content));
  }

  private getClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/funds/balance');
  }

  private getMonthlyClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/funds/balance/monthly');
  }

}
