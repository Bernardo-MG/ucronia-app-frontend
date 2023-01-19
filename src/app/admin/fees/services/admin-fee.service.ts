import { Injectable } from '@angular/core';
import { Sort } from '@app/api/models/sort';
import { ReadPagedOperations } from '@app/api/request/read-paged-operations';
import { RequestClient } from '@app/api/request/request-client';
import { UserFeeCalendar } from '@app/models/user-fee-calendar';
import { FeeCalendarRange } from '@app/models/fee-calendar-range';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminFeeService {

  private feeYearUrl = environment.apiUrl + "/fee/calendar";

  private feeYearRangeUrl = environment.apiUrl + "/fee/calendar/range";

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

  public getRange(): Observable<FeeCalendarRange> {
    const clt: ReadPagedOperations<FeeCalendarRange> = this.client.readPaged(this.feeYearRangeUrl);

    return clt.fetchOne().pipe(map(r => r.content));
  }

}
