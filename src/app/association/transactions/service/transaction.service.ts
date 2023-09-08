import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '@app/association/models/transaction';
import { TransactionApi } from '@app/core/api/client/transaction-api';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { map, Observable } from 'rxjs';
import { TransactionFilter } from '../models/transaction-filter';

@Injectable()
export class TransactionService {

  private transactionApi = new TransactionApi(this.http);

  constructor(
    private http: HttpClient
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

    return this.transactionApi.readAll(query);
  }

  public create(data: Transaction): Observable<Transaction> {
    return this.transactionApi.create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Transaction): Observable<Transaction> {
    return this.transactionApi.updateById(id, data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.transactionApi.deleteById(id).pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Transaction> {
    return this.transactionApi.readById(id).pipe(map(r => r.content));
  }

}
