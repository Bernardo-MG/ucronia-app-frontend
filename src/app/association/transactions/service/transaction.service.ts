import { Injectable } from '@angular/core';
import { Transaction } from '@app/association/models/transaction';
import { TransactionCalendarRange } from '@app/association/models/transaction-calendar-range';
import { AngularAssociationApiClient } from '@app/core/api/client/angular-association-api-client';
import { PaginatedResponse } from '@app/shared/utils/api/models/paginated-response';
import { PaginationRequest } from '@app/shared/utils/api/models/pagination-request';
import { Sort } from '@app/shared/utils/api/models/sort';
import { map, Observable } from 'rxjs';
import { TransactionFilter } from '../models/transaction-filter';

@Injectable()
export class TransactionService {

  constructor(
    private client: AngularAssociationApiClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined, filter: TransactionFilter): Observable<PaginatedResponse<Transaction[]>> {
    const sort = new Sort<Transaction>('date');
    sort.order = 'desc';

    return this.client.transaction().page(pagination).sort([sort])
      .parameter("startDate", filter.startDate).parameter("endDate", filter.endDate).parameter("date", filter.date)
      .read();
  }

  public create(data: Transaction): Observable<Transaction> {
    return this.client.transaction().create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Transaction): Observable<Transaction> {
    return this.client.transaction().id(id).update(data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<Transaction> {
    return this.client.transaction().id(id).delete().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Transaction> {
    return this.client.transaction().id(id).read().pipe(map(r => r.content));
  }

  public getRange(): Observable<TransactionCalendarRange> {
    return this.client.transactionRange().read().pipe(map(r => r.content));
  }

}
