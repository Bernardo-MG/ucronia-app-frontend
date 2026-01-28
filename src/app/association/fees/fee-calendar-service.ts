import { inject, Injectable } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { MemberFees, MemberStatus, YearsRange } from "@ucronia/domain";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeCalendarService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getCalendar(year: number, active: MemberStatus): Observable<MemberFees[]> {
    return this.ucroniaClient.fee.year(year, active);
  }

  public getRange(): Observable<YearsRange> {
    return this.ucroniaClient.fee.range();
  }

}
