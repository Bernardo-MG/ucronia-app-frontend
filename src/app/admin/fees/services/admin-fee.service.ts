import { Injectable } from '@angular/core';
import { Sort } from '@app/api/models/sort';
import { ReadPagedOperations } from '@app/api/request/read-paged-operations';
import { RequestClient } from '@app/api/request/request-client';
import { FeeCalendar } from '@app/models/fee-calendar';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { FeeCalendarRange } from '../models/fee-calendar-range';

@Injectable({
  providedIn: 'root'
})
export class AdminFeeService {

  private feeYearUrl = environment.apiUrl + "/fee/calendar";

  private feeYearRangeUrl = environment.apiUrl + "/fee/calendar/range";

  constructor(
    private client: RequestClient
  ) { }

  public getAllForYear(year: number, onlyActive: boolean): Observable<FeeCalendar[]> {
    const url = `${this.feeYearUrl}/${year}`;
    const clt: ReadPagedOperations<FeeCalendar> = this.client.readPaged(url);
    const sort = new Sort<FeeCalendar>("name");

    clt.sort([sort]);
    clt.parameter("onlyActive", onlyActive);
    return clt.fetch().pipe(map(r => r.content));
  }

  public getRange(): Observable<FeeCalendarRange> {
    const clt: ReadPagedOperations<FeeCalendarRange> = this.client.readPaged(this.feeYearRangeUrl);

    return clt.fetchOne().pipe(map(r => r.content));
  }

}
