import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { AngularRequest } from '@app/core/api/request/angular-request';
import { Request } from '@app/core/api/request/request';
import { Month } from '@app/shared/calendar/models/month';
import { environment } from 'environments/environment';
import { Observable, concat, map, mergeMap, toArray } from 'rxjs';
import { Transaction } from '../models/transaction';
import { TransactionCalendarMonth } from '../models/transaction-calendar-month';
import { TransactionCalendarMonthsRange } from '../models/transaction-calendar-months-range';

@Injectable()
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
    return this.getRangeRequest()
    .read<SimpleResponse<TransactionCalendarMonthsRange>>()
    .pipe(map(r => r.content))
    .pipe(map(r => r.months.map(m => {
      const date = new Date(m);
      const month = new Month(date.getFullYear(), date.getMonth() + 1);

      return month;
    })));
  }

  private readCalendarMonth(year: number, month: number): Observable<SimpleResponse<TransactionCalendarMonth>> {
    return this.getRequest()
    .appendRoute(`/${year}/${month}`)
    .read<SimpleResponse<TransactionCalendarMonth>>();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/funds/calendar');
  }

  private getRangeRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/funds/calendar/range');
  }

}
