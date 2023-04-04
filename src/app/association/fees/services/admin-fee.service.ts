import { Injectable } from '@angular/core';
import { FeeCalendarRange } from '@app/association/models/fee-calendar-range';
import { FeeCalendarRow } from '@app/association/models/fee-calendar-row';
import { UserFeeCalendar } from '@app/association/models/user-fee-calendar';
import { Sort } from '@app/shared/utils/api/models/sort';
import { ReadPagedOperations } from '@app/shared/utils/api/request/read-paged-operations';
import { RequestClient } from '@app/shared/utils/api/request/request-client';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminFeeService {

  private feeYearUrl = environment.apiUrl + "/fee/calendar";

  private feeYearRangeUrl = environment.apiUrl + "/fee/calendar/range";

  private months: number[] = Array(12).fill(0).map((x, i) => i + 1);

  constructor(
    private client: RequestClient
  ) { }

  public getAllForYear(year: number, onlyActive: boolean): Observable<UserFeeCalendar[]> {
    const url = `${this.feeYearUrl}/${year}`;
    const clt: ReadPagedOperations<UserFeeCalendar> = this.client.readPaged(url);
    const sort = new Sort<UserFeeCalendar>("name");

    clt.sort([sort]);
    clt.parameter("onlyActive", onlyActive);
    return clt.fetch().pipe(map(r => r.content));
  }

  public getCalendar(year: number, onlyActive: boolean): Observable<FeeCalendarRow[]> {
    return this.getAllForYear(year, onlyActive).pipe(map(data => this.toCalendar(data)));
  }

  public getRange(): Observable<FeeCalendarRange> {
    const clt: ReadPagedOperations<FeeCalendarRange> = this.client.readPaged(this.feeYearRangeUrl);

    return clt.fetchOne().pipe(map(r => r.content));
  }

  private toCalendar(data: UserFeeCalendar[]): FeeCalendarRow[] {
    return data.map(r => {
      const row = new FeeCalendarRow();
      row.name = r.name;
      row.surname = r.surname;
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
