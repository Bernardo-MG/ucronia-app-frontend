import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { SortingParams } from '@app/core/api/client/sorting-params';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { SortProperty } from '@app/core/api/models/sort-field';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { MemberBalance } from '../../../../models/members/member-balance';

@Injectable({
  providedIn: "root"
})
export class MemberBalanceService {

  constructor(
    private http: HttpClient
  ) { }

  public monthly(startDate: string | undefined, endDate: string | undefined): Observable<MemberBalance[]> {
    return this.getClient()
      .parameter('startDate', startDate)
      .parameter('endDate', endDate)
      .read<SimpleResponse<MemberBalance[]>>()
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/member/monthly');
  }

}
