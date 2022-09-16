import { Injectable } from '@angular/core';
import { Sort } from '@app/api/models/sort';
import { ReadOperations } from '@app/api/request/read-operations';
import { RequestClient } from '@app/api/request/request-client';
import { FeeYear } from '@app/models/fee-year';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminFeeService {

  private feeYearUrl = environment.apiUrl + "/fee/year";

  private feeUrl = environment.apiUrl + "/fee";

  constructor(
    private client: RequestClient
  ) { }

  public getAllForYear(year: number): Observable<FeeYear[]> {
    const url = `${this.feeYearUrl}/${year}`;
    const clt: ReadOperations<FeeYear> = this.client.read(url);
    const sort = new Sort<FeeYear>("member");

    clt.sort(sort);
    return clt.fetchUnwrapped();
  }

}
