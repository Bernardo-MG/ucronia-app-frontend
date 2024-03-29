import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeeApi } from '@app/association/api/fee-api';
import { Active } from '@app/association/members/models/active';
import { FeeCalendarYearsRange } from '@app/association/fees/models/fee-calendar-years-range';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { Sort } from '@app/core/api/models/sort';
import { map, Observable } from 'rxjs';
import { FeeCalendar } from '../models/fee-calendar';

@Injectable()
export class FeeCalendarService {

  private feeApi = new FeeApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public getCalendar(year: number, active: Active): Observable<FeeCalendar[]> {
    const query = new PaginatedQuery<FeeCalendar>();
    query.sort = [new Sort("fullName")];
    if (active === Active.Active) {
      query.addParameter("status", 'ACTIVE');
    } else if (active === Active.Inactive) {
      query.addParameter("status", 'INACTIVE');
    }

    return this.feeApi.calendarYear(year, query)
      .pipe(map(r => r.content));
  }

  public getRange(): Observable<FeeCalendarYearsRange> {
    return this.feeApi
      .calendarRange()
      .pipe(map(r => r.content));
  }

}
