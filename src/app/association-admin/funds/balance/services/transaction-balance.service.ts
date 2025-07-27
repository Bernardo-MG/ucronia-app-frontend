import { Injectable, inject } from '@angular/core';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { TransactionCurrentBalance } from '../../../../models/transactions/transaction-current-balance';
import { TransactionMonthlyBalance } from '../../../../models/transactions/transaction-monthly-balance';

@Injectable({
  providedIn: "root"
})
export class TransactionBalanceService {

  private readonly balanceClient;

  private readonly monthlyBalanceClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.balanceClient = clientProvider.url(environment.apiUrl + '/funds/balance');
    this.monthlyBalanceClient = clientProvider.url(environment.apiUrl + '/funds/balance/monthly');
  }

  public current(): Observable<TransactionCurrentBalance> {
    return this.balanceClient
      .read<SimpleResponse<TransactionCurrentBalance>>()
      .pipe(map(r => r.content));
  }

  public monthly(startDate: string | undefined, endDate: string | undefined): Observable<TransactionMonthlyBalance[]> {
    return this.monthlyBalanceClient
      .parameter('startDate', startDate)
      .parameter('endDate', endDate)
      .read<SimpleResponse<TransactionMonthlyBalance[]>>()
      .pipe(map(r => r.content));
  }

}
