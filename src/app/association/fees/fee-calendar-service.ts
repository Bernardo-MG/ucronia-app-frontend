import { inject, Injectable } from '@angular/core';
import { Sorting, SortingProperty } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { MemberFees, MemberStatus, YearsRange } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeCalendarService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getCalendar(year: number, active: MemberStatus): Observable<MemberFees[]> {
    const sorting = new Sorting(
      [
        new SortingProperty('member.name.firstName'),
        new SortingProperty('member.name.lastName')
      ]
    );

    return this.ucroniaClient.fee.year(year, active, sorting);
  }

  public getRange(): Observable<YearsRange> {
    return this.ucroniaClient.fee.range();
  }

}
