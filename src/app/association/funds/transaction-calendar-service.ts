import { Injectable, inject } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { Page } from '@bernardo-mg/request';
import { Month } from '@bernardo-mg/ui';
import { UcroniaClient } from '@ucronia/api';
import { Transaction } from '@ucronia/domain';
import { addDays, addMinutes, lastDayOfMonth, startOfMonth } from 'date-fns';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TransactionCalendarService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getCalendarInRange(year: number, month: number): Observable<Transaction[]> {
    const date = new Date(year, month);
    const from = startOfMonth(date);
    const to = lastDayOfMonth(date);

    const fromWithMargin = addDays(from, -7);
    const toWithMargin = addDays(to, 7);

    return getAllPages((page, size) => this.ucroniaClient.transaction
      .page(page, size, undefined, undefined, fromWithMargin, toWithMargin))
      .pipe(
        // TODO: Why is this needed for the calendar?
        map(transactions => {
          const offset = new Date().getTimezoneOffset();
          return transactions.map(t => ({
            ...t,
            date: addMinutes(t.date, -offset)
          }));
        })
      );
  }

  public getRange(): Observable<Month[]> {
    return this.ucroniaClient.transaction.range();
  }

}
