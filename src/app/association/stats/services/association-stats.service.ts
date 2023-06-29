import { Injectable } from '@angular/core';
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

  public countActiveMembers(): Observable<number> {
    return this.client.member().parameter("active", true).readAll().pipe(map(r => r.totalElements));
  }

  public getActiveMembers(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Member[]>> {
    return this.client.member().page(pagination).sort(pagination?.sort).readAll();
  }

}
