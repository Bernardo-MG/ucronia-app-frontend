import { Injectable } from '@angular/core';
import { Active } from '@app/association/members/model/active';
import { FeeCalendar } from '@app/models/fees/fee-calendar';
import { FeeCalendarYearsRange } from '@app/models/fees/fee-calendar-years-range';
import { AngularCrudClientProvider, SimpleResponse, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeCalendarService {

  private readonly client;

  constructor(
    clientProvider: AngularCrudClientProvider
  ) {
    this.client = clientProvider.url(environment.apiUrl + '/fee/calendar');
  }

  public getCalendar(year: number, active: Active): Observable<FeeCalendar[]> {
    return this.client
      .loadParameters(new SortingParams([new SortingProperty("firstName"), new SortingProperty("lastName")]))
      .parameter('status', active.toString().toUpperCase())
      .appendRoute(`/${year}`)
      .read<SimpleResponse<FeeCalendar[]>>()
      .pipe(map(r => r.content));
  }

  public getRange(): Observable<FeeCalendarYearsRange> {
    return this.client
      .appendRoute("/range")
      .read<SimpleResponse<FeeCalendarYearsRange>>()
      .pipe(map(r => r.content));
  }

}
