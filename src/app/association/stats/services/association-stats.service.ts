import { Injectable } from '@angular/core';
import { Balance } from '@app/association/models/balance';
import { Member } from '@app/association/models/member';
import { AssociationApiClient } from '@app/core/api/client/association-api-client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssociationStatsService {

  constructor(
    private client: AssociationApiClient
  ) { }

  public getActiveMembers(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Member[]>> {
    return this.client.member().parameter("active", true).page(pagination).sort(pagination?.sort).readAll();
  }

  public getBalance(): Observable<Balance> {
    return this.client.balance().readOne().pipe(map(r => r.content));
  }

}
