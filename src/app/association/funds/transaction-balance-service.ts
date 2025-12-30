import { Injectable, inject } from '@angular/core';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { TransactionCurrentBalance, TransactionMonthlyBalance } from "@ucronia/domain";
import { addMinutes } from 'date-fns';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

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
    const offset = new Date().getTimezoneOffset();
    let fromUtc;
    let toUtc;

    if (from) {
      fromUtc = addMinutes(from, offset);
    } else {
      fromUtc = undefined;
    }
    if (to) {
      toUtc = addMinutes(to, offset);
    } else {
      toUtc = undefined;
    }

    return this.monthlyBalanceClient
      .parameter('from', fromUtc?.toISOString())
      .parameter('to', toUtc?.toISOString())
      .read<SimpleResponse<TransactionMonthlyBalance[]>>()
      .pipe(map(r => r.content));
  }

}
