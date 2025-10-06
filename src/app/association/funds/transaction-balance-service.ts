import { Injectable, inject } from '@angular/core';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { TransactionCurrentBalance } from '@app/domain/transactions/transaction-current-balance';
import { TransactionMonthlyBalance } from '@app/domain/transactions/transaction-monthly-balance';

@Injectable({
  providedIn: "root"
})
export class TransactionBalanceService {

  private readonly balanceClient;

  private readonly monthlyBalanceClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.balanceClient = clientProvider.url(environment.apiUrl + '/transaction/balance');
    this.monthlyBalanceClient = clientProvider.url(environment.apiUrl + '/transaction/balance/monthly');
  }

  public current(): Observable<TransactionCurrentBalance> {
    return this.balanceClient
      .read<SimpleResponse<TransactionCurrentBalance>>()
      .pipe(map(r => r.content));
  }

  public monthly(from: Date | undefined, to: Date | undefined): Observable<TransactionMonthlyBalance[]> {
    return this.monthlyBalanceClient
      .parameter('from', from?.toISOString().slice(0, 7))
      .parameter('to', to?.toISOString().slice(0, 7))
      .read<SimpleResponse<TransactionMonthlyBalance[]>>()
      .pipe(map(r => r.content));
  }

}
