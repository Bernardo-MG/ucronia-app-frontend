import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeeCalendarYearsRange } from '@app/association/fees/shared/models/fee-calendar-years-range';
import { Active } from '@app/association/members/shared/models/active';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { FeeCalendar } from '../../shared/models/fee-calendar';

@Injectable({
  providedIn: "root"
})
export class FeeCalendarService {

  constructor(
    private http: HttpClient
  ) { }

  public getCalendar(year: number, active: Active): Observable<FeeCalendar[]> {
    const query = new PaginatedQuery();
    query.sort = new Sort([new SortProperty("fullName")]);
    query.addParameter('status', active.toString().toUpperCase());

    return this.getClient()
      .query(query)
      .appendRoute(`/${year}`)
      .read<SimpleResponse<FeeCalendar[]>>()
      .pipe(map(r => r.content));
  }

  public getRange(): Observable<FeeCalendarYearsRange> {
    return this.getClient()
      .appendRoute("/range")
      .read<SimpleResponse<FeeCalendarYearsRange>>()
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/fee/calendar');
  }

}
