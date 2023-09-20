import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionApi } from '@app/association/api/transaction-api';
import { Observable, concat, map, mergeMap, toArray } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable()
export class TransactionCalendarService {

  private transactionApi = new TransactionApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public getCalendar(year: number, month: number): Observable<Transaction[]> {
    let previousYear;
    let previousMonth;
    if (month > 1) {
      previousYear = year;
      previousMonth = month - 1;
    } else {
      previousYear = year - 1;
      previousMonth = 12;
    }
    let nextYear;
    let nextMonth;
    if (month > 1) {
      nextYear = year;
      nextMonth = month + 1;
    } else {
      nextYear = year - 1;
      nextMonth = 12;
    }

    const previousMonthQuery = this.transactionApi.calendarMonth(previousYear, previousMonth).pipe(map(r => r.content));
    const thisMonthQuery = this.transactionApi.calendarMonth(year, month).pipe(map(r => r.content));
    const nextMonthQuery = this.transactionApi.calendarMonth(nextYear, nextMonth).pipe(map(r => r.content));

    return concat(previousMonthQuery, thisMonthQuery, nextMonthQuery).pipe(
      mergeMap((data) => data), // Flatten the arrays emitted by each observable
      toArray(), // Collect all emissions into a single array
    );
  }

  public getRange(): Observable<Date[]> {
    return this.transactionApi.calendarRange().pipe(map(r => r.content)).pipe(map(r => r.months.map(m => new Date(m))));
  }

}
