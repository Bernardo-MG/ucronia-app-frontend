import { Injectable, inject } from '@angular/core';
import { Sorting, SortingProperty, SortingDirection } from '@bernardo-mg/request';
import { Month } from '@bernardo-mg/ui';
import { UcroniaClient } from '@ucronia/api';
import { Transaction } from '@ucronia/domain';
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import { EMPTY, expand, Observable, reduce } from 'rxjs';

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

    const pageSize = 100;
    const endpoint = this.ucroniaClient.transaction;
    return endpoint.page(1, pageSize, this.calendarSorting, undefined, from, to).pipe(
      expand(page => page.last ? EMPTY : endpoint.page(page.page + 1, pageSize, this.calendarSorting, undefined, from, to)),
      reduce((items, page) => items.concat(page.content), [] as Transaction[])
    );
  }

  public getRange(): Observable<Month[]> {
    return this.ucroniaClient.transaction.range();
  }

}
