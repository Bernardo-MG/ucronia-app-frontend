import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Active } from '@app/association/members/model/active';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { FeeCalendar } from '@app/models/fees/fee-calendar';
import { FeeCalendarYearsRange } from '@app/models/fees/fee-calendar-years-range';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeCalendarService {

  constructor(
    private http: HttpClient
  ) { }

  public getCalendar(year: number, active: Active): Observable<FeeCalendar[]> {
    const query = new PaginatedQuery();
    query.sort = new Sort([new SortProperty("firstName"), new SortProperty("lastName")]);
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
