import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Balance } from '@app/association/models/balance';
import { Member } from '@app/association/models/member';
import { AssociationApiClient } from '@app/core/api/client/association-api-client';
import { MemberApi } from '@app/core/api/client/member-api';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { PaginatedQuery } from '@app/core/api/request/paginated-query';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociationStatsService {

  private memberApi = new MemberApi(this.http);

  constructor(
    private client: AssociationApiClient,
    private http: HttpClient
  ) { }

  public getActiveMembers(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Member[]>> {
    const query = new PaginatedQuery<Member>();
    query.pagination = pagination;
    query.addParameter("active", true);

    return this.memberApi.readAll(query);
  }

  public getBalance(): Observable<Balance> {
    return this.client.balance().readOne().pipe(map(r => r.content));
  }

}
