import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { Direction } from '@app/core/api/models/direction';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { AngularRequest } from '@app/core/api/request/angular-request';
import { Request } from '@app/core/api/request/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { TransactionCurrentBalance } from '../models/transaction-current-balance';
import { TransactionMonthlyBalance } from '../models/transaction-monthly-balance';

@Injectable()
export class TransactionBalanceService {

  constructor(
    private http: HttpClient
  ) { }

  public current(): Observable<TransactionCurrentBalance> {
    return this.getRequest().read<ApiResponse<TransactionCurrentBalance>>().pipe(map(r => r.content));
  }

  public monthly(startDate: string | undefined, endDate: string | undefined): Observable<TransactionMonthlyBalance[]> {
    const defaultSortDate = new SortField('month');
    defaultSortDate.direction = Direction.Ascending;

    const query = new PaginatedQuery();
    query.defaultSort = new Sort([defaultSortDate]);
    query.addParameter("startDate", startDate);
    query.addParameter("endDate", endDate);

    return this.getMonthlyRequest().query(query).read<ApiResponse<TransactionMonthlyBalance[]>>().pipe(map(r => r.content));
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/funds/balance');
  }

  private getMonthlyRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/funds/balance/monthly');
  }

}
