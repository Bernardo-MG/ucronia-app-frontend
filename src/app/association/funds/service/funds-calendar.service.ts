import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FundsCalendarApi } from '@app/association/api/funds-calendar-api';
import { Month } from '@app/shared/calendar/models/month';
import { Observable, concat, map, mergeMap, toArray } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable()
export class FundsCalendarService {

  private fundsCalendarApi = new FundsCalendarApi(this.http);

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

    const previousMonthQuery = this.fundsCalendarApi.calendarMonth(previousYear, previousMonth).pipe(map(r => r.content));
    const thisMonthQuery = this.fundsCalendarApi.calendarMonth(year, month).pipe(map(r => r.content));
    const nextMonthQuery = this.fundsCalendarApi.calendarMonth(nextYear, nextMonth).pipe(map(r => r.content));

    return concat(previousMonthQuery, thisMonthQuery, nextMonthQuery).pipe(
      mergeMap((data) => data), // Flatten the arrays emitted by each observable
      toArray(), // Collect all emissions into a single array
    );
  }

  public getRange(): Observable<Month[]> {
    return this.fundsCalendarApi.calendarRange().pipe(map(r => r.content)).pipe(map(r => r.months.map(m => {
      const date = new Date(m);
      const month = new Month();
      month.year = date.getFullYear();
      month.month = date.getMonth() + 1;

      return month;
    })));
  }

}
