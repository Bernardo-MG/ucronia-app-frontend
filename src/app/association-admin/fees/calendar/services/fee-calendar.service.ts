import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Active } from '@app/association/members/model/active';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { SortingParams } from '@app/core/api/client/sorting-params';
import { SimpleResponse } from '@app/core/api/models/simple-response';
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
    return this.getClient()
      .loadParameters(new SortingParams([new SortProperty("firstName"), new SortProperty("lastName")]))
      .parameter('status', active.toString().toUpperCase())
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
