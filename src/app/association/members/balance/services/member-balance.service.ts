import { Injectable } from '@angular/core';
import { AngularCrudClientProvider, CrudClient, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { MemberBalance } from '../../../../models/members/member-balance';

@Injectable({
  providedIn: "root"
})
export class MemberBalanceService {

  constructor(
      private clientProvider: AngularCrudClientProvider
  ) { }

  public monthly(startDate: string | undefined, endDate: string | undefined): Observable<MemberBalance[]> {
    return this.getClient()
      .parameter('startDate', startDate)
      .parameter('endDate', endDate)
      .read<SimpleResponse<MemberBalance[]>>()
      .pipe(map(r => r.content));
  }

  private getClient(): CrudClient {
    return this.clientProvider.url(environment.apiUrl + '/member/monthly');
  }

}
