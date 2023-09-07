import { Injectable } from '@angular/core';
import { Transaction } from '@app/association/models/transaction';
import { TransactionCalendarRange } from '@app/association/models/transaction-calendar-range';
import { AssociationApiClient } from '@app/core/api/client/association-api-client';
import { Sort } from '@app/core/api/models/sort';
import { PaginatedQuery } from '@app/core/api/request/paginated-query';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransactionCalendarService {

  constructor(
    private client: AssociationApiClient
  ) { }

  public getCalendar(year: number, month: number): Observable<Transaction[]> {
    const query = new PaginatedQuery<Transaction>();

    return this.client.transactionCalendar()
      .date(year, month)
      .readAll(query).pipe(map(r => r.content));
  }

  public getRange(): Observable<TransactionCalendarRange> {
    return this.client.transactionCalendar().range().readOne().pipe(map(r => r.content));
  }

}
