import { Injectable, inject } from '@angular/core';
import { Transaction } from '@ucronia/domain';
import { TransactionCalendarMonthsRange } from '@ucronia/domain';
import { AngularCrudClientProvider, SimpleResponse, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { Month } from '@bernardo-mg/ui';
import { addDays, addMinutes, format, lastDayOfMonth, startOfMonth } from 'date-fns';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

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

  public getCalendarInRange(year: number, month: number): Observable<Transaction[]> {
    let dateValue;
    if (month < 10) {
      dateValue = `${year}-0${month + 1}`;
    } else {
      dateValue = `${year}-${month + 1}`;
    }
    const date = new Date(dateValue)
    const from = startOfMonth(date);
    const to = new Date(format(lastDayOfMonth(date), 'yyyy-MM-dd'));

    const fromWithMargin = addDays(from, -7);
    const toWithMargin = addDays(to, 7);

    const offset = new Date().getTimezoneOffset();
    const fromUtc = addMinutes(fromWithMargin, offset);
    const toUtc = addMinutes(toWithMargin, offset);

    const sorting = new SortingParams(
      [new SortingProperty('date'), new SortingProperty('description')]
    );

    return this.calendarClient
      .parameter('from', fromUtc.toISOString())
      .parameter('to', toUtc.toISOString())
      .loadParameters(sorting)
      .read<SimpleResponse<Transaction[]>>()
      .pipe(map(r => r.content));
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

}
