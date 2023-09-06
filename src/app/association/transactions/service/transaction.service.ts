import { Injectable } from '@angular/core';
import { Transaction } from '@app/association/models/transaction';
import { AssociationApiClient } from '@app/core/api/client/association-api-client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { map, Observable } from 'rxjs';
import { TransactionFilter } from '../models/transaction-filter';

@Injectable()
export class TransactionService {

  constructor(
    private client: AssociationApiClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined, filter: TransactionFilter): Observable<PaginatedResponse<Transaction[]>> {
    const defaultSortDate = new Sort<Transaction>('date');
    defaultSortDate.order = 'desc';
    const defaultSortDescription = new Sort<Transaction>('description');
    defaultSortDescription.order = 'asc';

    return this.client.transaction().page(pagination).defaultSort([defaultSortDate, defaultSortDescription])
      .parameter("startDate", filter.startDate).parameter("endDate", filter.endDate).parameter("date", filter.date)
      .readAll();
  }

  public create(data: Transaction): Observable<Transaction> {
    return this.client.transaction().create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Transaction): Observable<Transaction> {
    return this.client.transaction().id(id).update(data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.client.transaction().id(id).delete().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Transaction> {
    return this.client.transaction().id(id).readOne().pipe(map(r => r.content));
  }

}
