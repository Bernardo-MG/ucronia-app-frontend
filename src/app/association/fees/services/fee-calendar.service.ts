import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeeCalendarYearsRange } from '@app/association/fees/models/fee-calendar-years-range';
import { Active } from '@app/association/members/models/active';
import { ApiResponse } from '@app/core/api/models/api-response';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { Sort } from '@app/core/api/models/sort';
import { AngularRequest } from '@app/core/api/request/angular-request';
import { Request } from '@app/core/api/request/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { FeeCalendar } from '../models/fee-calendar';

@Injectable()
export class FeeCalendarService {

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

    return this.getRequest().query(query).appendRoute(`/${year}`).read<ApiResponse<FeeCalendar[]>>()
      .pipe(map(r => r.content));
  }

  public getRange(): Observable<FeeCalendarYearsRange> {
    return this.getRequest().appendRoute("/range").read<ApiResponse<FeeCalendarYearsRange>>()
      .pipe(map(r => r.content));
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/fee/calendar');
  }

}
