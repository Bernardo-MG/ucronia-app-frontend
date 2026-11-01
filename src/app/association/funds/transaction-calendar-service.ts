import { Injectable, inject } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { Sorting, SortingProperty, SortingDirection } from '@bernardo-mg/request';
import { Month } from '@bernardo-mg/ui';
import { UcroniaClient } from '@ucronia/api';
import { Transaction } from '@ucronia/domain';
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionCalendarService {

  private readonly ucroniaClient = inject(UcroniaClient);

  private readonly calendarSorting = new Sorting([
    new SortingProperty('date', SortingDirection.Ascending),
    new SortingProperty('index', SortingDirection.Ascending)
  ]);

  public getCalendarInRange(year: number, month: number): Observable<Transaction[]> {
    const date = new Date(year, month);
    const from = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
    const to = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });

    return getAllPages((page, size) => this.ucroniaClient.transaction
      .page(page, size, this.calendarSorting, undefined, from, to));
  }

  public getRange(): Observable<Month[]> {
    return this.ucroniaClient.transaction.range();
  }

}
