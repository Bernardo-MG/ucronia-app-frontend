import { Injectable, inject } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { Month } from '@bernardo-mg/ui';
import { UcroniaClient } from '@ucronia/api';
import { Transaction } from '@ucronia/domain';
import { addDays, format, lastDayOfMonth, startOfMonth } from 'date-fns';
import { Observable } from 'rxjs';

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
      .page(page, size, undefined, fromWithMargin, toWithMargin));
  }

  public getRange(): Observable<Month[]> {
    return this.ucroniaClient.transaction.range();
  }

}
