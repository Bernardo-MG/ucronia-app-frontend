import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { SortingParams } from '@app/core/api/client/sorting-params';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { SortProperty } from '@app/core/api/models/sort-field';
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

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/funds/balance');
  }

  private getMonthlyClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/funds/balance/monthly');
  }

}
