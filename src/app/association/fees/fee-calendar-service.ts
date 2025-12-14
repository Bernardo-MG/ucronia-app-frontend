import { inject, Injectable } from '@angular/core';
import { AngularCrudClientProvider, SimpleResponse, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { MemberFees, MemberStatus, YearsRange } from "@ucronia/domain";
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeCalendarService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/fee');
  }

  public getCalendar(year: number, active: MemberStatus): Observable<MemberFees[]> {
    return this.client
      .loadParameters(new SortingParams([new SortingProperty("firstName"), new SortingProperty("lastName")]))
      .parameter('status', active.toString().toUpperCase())
      .appendRoute(`/${year}`)
      .read<SimpleResponse<MemberFees[]>>()
      .pipe(map(r => r.content));
  }

  public getRange(): Observable<YearsRange> {
    return this.client
      .appendRoute("/range")
      .read<SimpleResponse<YearsRange>>()
      .pipe(map(r => r.content));
  }

}
