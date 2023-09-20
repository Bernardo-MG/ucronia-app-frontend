import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BalanceApi } from '@app/association/api/balance-api';
import { MonthlyBalance } from '@app/association/funds/models/monthly-balance';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { Sort } from '@app/core/api/models/sort';
import { Observable, map } from 'rxjs';

@Injectable()
export class BalanceService {

  private balanceApi = new BalanceApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public current(): Observable<MonthlyBalance> {
    return this.balanceApi.read().pipe(map(r => r.content));
  }

  public monthly(startDate: string | undefined, endDate: string | undefined): Observable<MonthlyBalance[]> {
    const defaultSortDate = new Sort<MonthlyBalance>('month');
    defaultSortDate.order = 'asc';

    const query = new PaginatedQuery<MonthlyBalance>();
    query.defaultSort = [defaultSortDate];
    query.addParameter("startDate", startDate);
    query.addParameter("endDate", endDate);

    return this.balanceApi.readMonthly(query).pipe(map(r => r.content));
  }

}
