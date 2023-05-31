import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Transaction } from '@app/association/models/transaction';
import { TransactionCalendarRange } from '@app/association/models/transaction-calendar-range';
import { AssociationApiClient } from '@app/core/api/client/association-api-client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { FormDescription } from '@app/shared/edition/models/form-description';
import { FormType } from '@app/shared/edition/models/form-type';
import { map, Observable } from 'rxjs';
import { TransactionFilter } from '../models/transaction-filter';

@Injectable()
export class TransactionService {

  constructor(
    private client: AssociationApiClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined, filter: TransactionFilter): Observable<PaginatedResponse<Transaction[]>> {
    const sort = new Sort<Transaction>('date');
    sort.order = 'desc';

    return this.client.transaction().page(pagination).sort([sort])
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

  public getRange(): Observable<TransactionCalendarRange> {
    return this.client.transactionRange().readOne().pipe(map(r => r.content));
  }

  public getFields(): FormDescription[] {
    return [
      new FormDescription('Description', 'description', FormType.string, Validators.required),
      new FormDescription('Date', 'date', FormType.date, Validators.required),
      new FormDescription('Amount', 'amount', FormType.number, Validators.required)
    ];
  }

}
