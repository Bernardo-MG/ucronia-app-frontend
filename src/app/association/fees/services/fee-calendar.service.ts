import { Injectable } from '@angular/core';
import { FeeCalendarRange } from '@app/association/models/fee-calendar-range';
import { FeeCalendarRow } from '@app/association/models/fee-calendar-row';
import { UserFeeCalendar } from '@app/association/models/user-fee-calendar';
import { AssociationApiClient } from '@app/core/api/client/association-api-client';
import { Sort } from '@app/core/api/models/sort';
import { PaginatedQuery } from '@app/core/api/request/paginated-query';
import { map, Observable } from 'rxjs';

@Injectable()
export class FeeCalendarService {

  private months: number[] = Array(12).fill(0).map((x, i) => i + 1);

  constructor(
    private client: AssociationApiClient
  ) { }

  public getCalendar(year: number, onlyActive: boolean): Observable<FeeCalendarRow[]> {
    const query = new PaginatedQuery<UserFeeCalendar>();
    query.sort = [new Sort<UserFeeCalendar>("name")];
    query.addParameter("onlyActive", onlyActive);

    return this.client.feeCalendar()
      .year(year)
      .readAll(query)
      .pipe(map(r => r.content))
      .pipe(map(data => this.toCalendar(data)));
  }

  public getRange(): Observable<FeeCalendarRange> {
    return this.client.feeCalendar()
      .range()
      .readOne()
      .pipe(map(r => r.content));
  }

  private toCalendar(data: UserFeeCalendar[]): FeeCalendarRow[] {
    return data.map(r => {
      const row = new FeeCalendarRow();
      row.name = r.name;
      row.active = r.active;
      this.months.forEach(month => {
        const feeMonth = r.months.find(m => m.month === month);
        let column;

        if (feeMonth) {
          column = feeMonth.paid;
        } else {
          column = undefined;
        }
        row.months.push(column);
      });

      return row;
    });
  }

}
