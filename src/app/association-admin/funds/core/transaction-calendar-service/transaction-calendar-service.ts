import { Injectable, inject } from '@angular/core';
import { TransactionCalendarMonth } from '@app/domain/transactions/transaction-calendar-month';
import { TransactionCalendarMonthsRange } from '@app/domain/transactions/transaction-calendar-months-range';
import { Month } from '@app/shared/calendar/models/month';
import { Colors } from '@app/shared/utils/colors';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { CalendarEvent } from 'angular-calendar';
import { environment } from 'environments/environment';
import { Observable, concat, map, mergeMap, toArray } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TransactionCalendarService {

  private readonly calendarClient;

  private readonly calendarRangeClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.calendarClient = clientProvider.url(environment.apiUrl + '/transaction/calendar');
    this.calendarRangeClient = clientProvider.url(environment.apiUrl + '/transaction/calendar/range');
  }

  public getCalendar(year: number, month: number): Observable<CalendarEvent<{ transactionId: number }>[]> {
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
      mergeMap((data) => data.transactions.map(t => {
        const date = new Date(t.date);
        let color;
        if (t.amount >= 0) {
          color = Colors.blue;
        } else {
          color = Colors.red;
        }
        return {
          title: `${t.description} (${t.amount}€)`,
          color: color,
          start: date,
          meta: {
            transactionId: t.index,
          }
        };
      })),
      toArray(),
    );
  }

  public getRange(): Observable<Month[]> {
    return this.calendarRangeClient
      .read<SimpleResponse<TransactionCalendarMonthsRange>>()
      .pipe(map(r => r.content))
      .pipe(map(r => r.months.map(m => {
        const date = new Date(m);
        const month = new Month(date.getFullYear(), date.getMonth() + 1);

        return month;
      })));
  }

  private readCalendarMonth(year: number, month: number): Observable<SimpleResponse<TransactionCalendarMonth>> {
    return this.calendarClient
      .appendRoute(`/${year}/${month}`)
      .read<SimpleResponse<TransactionCalendarMonth>>();
  }

}
