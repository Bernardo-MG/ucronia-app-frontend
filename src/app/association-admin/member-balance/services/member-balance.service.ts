import { Injectable } from '@angular/core';
import { MemberBalance } from '@app/models/members/member-balance';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class MemberBalanceService {

  private readonly client;

  constructor(
    clientProvider: AngularCrudClientProvider
  ) {
    this.client = clientProvider.url(environment.apiUrl + '/member/monthly');
  }

  public monthly(startDate: string | undefined, endDate: string | undefined): Observable<MemberBalance[]> {
    return this.client
      .parameter('startDate', startDate)
      .parameter('endDate', endDate)
      .read<SimpleResponse<MemberBalance[]>>()
      .pipe(map(r => r.content));
  }

}
