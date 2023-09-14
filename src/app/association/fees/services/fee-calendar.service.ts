import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeeApi } from '@app/association/api/fee-api';
import { FeeCalendarRange } from '@app/association/models/fee-calendar-range';
import { UserFeeCalendar } from '@app/association/models/user-fee-calendar';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { Sort } from '@app/core/api/models/sort';
import { map, Observable } from 'rxjs';

@Injectable()
export class FeeCalendarService {

  private feeApi = new FeeApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public getCalendar(year: number, onlyActive: boolean): Observable<UserFeeCalendar[]> {
    const query = new PaginatedQuery<UserFeeCalendar>();
    query.sort = [new Sort<UserFeeCalendar>("memberName")];
    query.addParameter("onlyActive", onlyActive);

    return this.feeApi.calendarYear(year, query)
      .pipe(map(r => r.content));
  }

  public getRange(): Observable<FeeCalendarRange> {
    return this.feeApi
      .calendarRange()
      .pipe(map(r => r.content));
  }

}
