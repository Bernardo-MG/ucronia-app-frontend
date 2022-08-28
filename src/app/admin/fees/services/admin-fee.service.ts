import { Injectable } from '@angular/core';
import { CreateOperations } from '@app/api/request/create-operations';
import { ReadOperations } from '@app/api/request/read-operations';
import { RequestClient } from '@app/api/request/request-client';
import { Fee } from '@app/models/fee';
import { FeeYear } from '@app/models/fee-year';
import { Member } from '@app/models/member';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminFeeService {

  private feeYearUrl = environment.apiUrl + "/fee/year";

  private feeUrl = environment.apiUrl + "/fee";

  private memberUrl = environment.apiUrl + "/member";

  constructor(
    private client: RequestClient
  ) { }

  public getAllForYear(year: number): Observable<FeeYear[]> {
    const url = `${this.feeYearUrl}/${year}`;
    const clt: ReadOperations<FeeYear> = this.client.read(url);
    return clt.fetchUnwrapped();
  }

  public create(fee: Fee): Observable<Fee> {
    const clt: CreateOperations<Fee> = this.client.create(this.feeUrl);
    return clt.body(fee).pushUnwrapped();
  }

  public getAllMembers(): Observable<Member[]> {
    const clt: ReadOperations<Member> = this.client.read(this.memberUrl);
    return clt.fetchUnwrapped();
  }

}
