import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { Month } from '@app/shared/calendar/models/month';
import { environment } from 'environments/environment';
import { Observable, concat, map, mergeMap, toArray } from 'rxjs';
import { Transaction } from '../../../../models/transactions/transaction';
import { TransactionCalendarMonth } from '../../../../models/transactions/transaction-calendar-month';
import { TransactionCalendarMonthsRange } from '../../../../models/transactions/transaction-calendar-months-range';

@Injectable({
  providedIn: "root"
})
export class TransactionCalendarService {

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
    if (month < 12) {
      nextYear = year;
      nextMonth = month + 1;
    } else {
      nextYear = year + 1;
      nextMonth = 1;
    }

    const previousMonthQuery = this.readCalendarMonth(previousYear, previousMonth).pipe(map(r => r.content));
    const thisMonthQuery = this.readCalendarMonth(year, month).pipe(map(r => r.content));
    const nextMonthQuery = this.readCalendarMonth(nextYear, nextMonth).pipe(map(r => r.content));

    return concat(previousMonthQuery, thisMonthQuery, nextMonthQuery).pipe(
      mergeMap((data) => data.transactions), // Flatten the arrays emitted by each observable
      toArray(), // Collect all emissions into a single array
    );
  }

  public getRange(): Observable<Month[]> {
    return this.getRangeClient()
    .read<SimpleResponse<TransactionCalendarMonthsRange>>()
    .pipe(map(r => r.content))
    .pipe(map(r => r.months.map(m => {
      const date = new Date(m);
      const month = new Month(date.getFullYear(), date.getMonth() + 1);

      return month;
    })));
  }

  private readCalendarMonth(year: number, month: number): Observable<SimpleResponse<TransactionCalendarMonth>> {
    return this.getClient()
    .appendRoute(`/${year}/${month}`)
    .read<SimpleResponse<TransactionCalendarMonth>>();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/funds/calendar');
  }

  private getRangeClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/funds/calendar/range');
  }

}
