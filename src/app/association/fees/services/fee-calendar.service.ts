import { Injectable } from '@angular/core';
import { FeeCalendarRange } from '@app/association/models/fee-calendar-range';
import { UserFeeCalendar } from '@app/association/models/user-fee-calendar';
import { AssociationApiClient } from '@app/core/api/client/association-api-client';
import { Sort } from '@app/core/api/models/sort';
import { map, Observable } from 'rxjs';

@Injectable()
export class FeeCalendarService {

  private months: number[] = Array(12).fill(0).map((x, i) => i + 1);

  constructor(
    private client: AssociationApiClient
  ) { }

  public getCalendar(year: number, onlyActive: boolean): Observable<UserFeeCalendar[]> {
    const sort = new Sort<UserFeeCalendar>("name");

    return this.client.feeCalendar()
      .year(year)
      .sort([sort])
      .parameter("onlyActive", onlyActive)
      .readAll().pipe(map(r => r.content));
  }

  public getRange(): Observable<FeeCalendarRange> {
    return this.client.feeCalendar()
      .range()
      .readOne()
      .pipe(map(r => r.content));
  }

}
