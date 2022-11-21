import { Injectable } from '@angular/core';
import { Sort } from '@app/api/models/sort';
import { ReadPagedOperations } from '@app/api/request/read-paged-operations';
import { RequestClient } from '@app/api/request/request-client';
import { FeeYear } from '@app/models/fee-year';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { FeeYearRange } from '../models/fee-year-range';

@Injectable({
  providedIn: 'root'
})
export class AdminFeeService {

  private feeYearUrl = environment.apiUrl + "/fee/year";

  private feeYearRangeUrl = environment.apiUrl + "/fee/year/range";

  constructor(
    private client: RequestClient
  ) { }

  public getAllForYear(year: number, onlyActive: boolean): Observable<FeeYear[]> {
    const url = `${this.feeYearUrl}/${year}`;
    const clt: ReadPagedOperations<FeeYear> = this.client.readPaged(url);
    const sort = new Sort<FeeYear>("name");

    clt.sort([sort]);
    clt.parameter("onlyActive", onlyActive);
    return clt.fetch().pipe(map(r => r.content));
  }

  public getRange(): Observable<FeeYearRange> {
    const clt: ReadPagedOperations<FeeYearRange> = this.client.readPaged(this.feeYearRangeUrl);

    return clt.fetchOne().pipe(map(r => r.content));
  }

}
