import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionApi } from '@app/association/api/transaction-api';
import { Transaction } from '@app/association/models/transaction';
import { TransactionCalendarRange } from '@app/association/models/transaction-calendar-range';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransactionCalendarService {

  private transactionApi = new TransactionApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public getCalendar(year: number, month: number): Observable<Transaction[]> {
    return this.transactionApi.calendarMonth(year, month).pipe(map(r => r.content));
  }

  public getRange(): Observable<TransactionCalendarRange> {
    return this.transactionApi.calendarRange().pipe(map(r => r.content));
  }

}
