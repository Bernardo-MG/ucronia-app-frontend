import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionApi } from '@app/association/api/transaction-api';
import { Observable, map } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable()
export class TransactionCalendarService {

  private transactionApi = new TransactionApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public getCalendar(year: number, month: number): Observable<Transaction[]> {
    return this.transactionApi.calendarMonth(year, month).pipe(map(r => r.content));
  }

  public getRange(): Observable<Date[]> {
    return this.transactionApi.calendarRange().pipe(map(r => r.content)).pipe(map(r => r.months.map(m => new Date(m))));
  }

}
