import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeeCalendarRange } from '@app/association/models/fee-calendar-range';
import { FeeCalendarRow } from '@app/association/models/fee-calendar-row';
import { UserFeeCalendar } from '@app/association/models/user-fee-calendar';
import { FeeApi } from '@app/core/api/client/fee-api';
import { Sort } from '@app/core/api/models/sort';
import { PaginatedQuery } from '@app/core/api/request/paginated-query';
import { map, Observable } from 'rxjs';

@Injectable()
export class FeeCalendarService {

  private months: number[] = Array(12).fill(0).map((x, i) => i + 1);

  private feeApi = new FeeApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public getCalendar(year: number, onlyActive: boolean): Observable<FeeCalendarRow[]> {
    const query = new PaginatedQuery<UserFeeCalendar>();
    query.sort = [new Sort<UserFeeCalendar>("name")];
    query.addParameter("onlyActive", onlyActive);

    return this.feeApi.calendarYear(year, query)
      .pipe(map(r => r.content))
      .pipe(map(data => this.toCalendar(data)));
  }

  public getRange(): Observable<FeeCalendarRange> {
    return this.feeApi
      .calendarRange()
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
