import { Injectable } from '@angular/core';
import { Transaction } from '@app/association/models/transaction';
import { TransactionCalendarRange } from '@app/association/models/transaction-calendar-range';
import { AssociationApiClient } from '@app/core/api/client/association-api-client';
import { Sort } from '@app/core/api/models/sort';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransactionCalendarService {

  constructor(
    private client: AssociationApiClient
  ) { }

  public getCalendar(year: number, month: number): Observable<Transaction[]> {
    return this.client.transactionCalendar()
      .date(year, month)
      .readAll().pipe(map(r => r.content));
  }

  public getRange(): Observable<TransactionCalendarRange> {
    return this.client.transactionCalendar().range().readOne().pipe(map(r => r.content));
  }

}
