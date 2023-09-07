import { Injectable } from '@angular/core';
import { Transaction } from '@app/association/models/transaction';
import { AssociationApiClient } from '@app/core/api/client/association-api-client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { PaginatedQuery } from '@app/core/api/request/paginated-query';
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

    const query = new PaginatedQuery<Transaction>();
    query.defaultSort = [defaultSortDate, defaultSortDescription];
    query.pagination = pagination;
    query.addParameter("startDate", filter.startDate);
    query.addParameter("endDate", filter.endDate);
    query.addParameter("date", filter.date);

    return this.client.transaction().readAll(query);
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
