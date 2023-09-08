import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BalanceApi } from '@app/association/api/balance-api';
import { MemberApi } from '@app/association/api/member-api';
import { Balance } from '@app/association/models/balance';
import { Member } from '@app/association/models/member';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociationStatsService {

  private memberApi = new MemberApi(this.http);

  private balanceApi = new BalanceApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public getActiveMembers(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Member[]>> {
    const query = new PaginatedQuery<Member>();
    query.pagination = pagination;
    query.addParameter("active", true);

    return this.memberApi.readAll(query);
  }

  public getBalance(): Observable<Balance> {
    return this.balanceApi.readOne().pipe(map(r => r.content));
  }

}
