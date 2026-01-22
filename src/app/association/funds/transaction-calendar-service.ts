import { Injectable, inject } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { Month } from '@bernardo-mg/ui';
import { UcroniaClient } from '@ucronia/api';
import { Transaction } from "@ucronia/domain";
import { startOfMonth, format, lastDayOfMonth, addDays } from 'date-fns';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TransactionCalendarService {

  private readonly ucroniaClient = inject(UcroniaClient);

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

    return getAllPages((page, size) => this.ucroniaClient.transaction
      .page(page, size, fromWithMargin, toWithMargin));
  }

  public getRange(): Observable<Month[]> {
    return this.ucroniaClient.transaction.range();
  }

}
