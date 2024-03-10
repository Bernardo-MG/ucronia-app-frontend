import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionBalanceApi } from '@app/association/api/transaction-balance-api';
import { Direction } from '@app/core/api/models/direction';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { Sort } from '@app/core/api/models/sort';
import { Observable, map } from 'rxjs';
import { TransactionCurrentBalance } from '../models/transaction-current-balance';
import { TransactionMonthlyBalance } from '../models/transaction-monthly-balance';

@Injectable()
export class TransactionBalanceService {

  private transactionBalanceApi = new TransactionBalanceApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public current(): Observable<TransactionCurrentBalance> {
    return this.transactionBalanceApi.readCurrent().pipe(map(r => r.content));
  }

  public monthly(startDate: string | undefined, endDate: string | undefined): Observable<TransactionMonthlyBalance[]> {
    const defaultSortDate = new Sort('month');
    defaultSortDate.direction = Direction.Ascending;

    const query = new PaginatedQuery<TransactionMonthlyBalance>();
    query.defaultSort = [defaultSortDate];
    query.addParameter("startDate", startDate);
    query.addParameter("endDate", endDate);

    return this.transactionBalanceApi.readMonthly(query).pipe(map(r => r.content));
  }

}
