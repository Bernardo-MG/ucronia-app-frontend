import { Injectable } from '@angular/core';
import { Member } from '@app/association/models/member';
import { AssociationApiClient } from '@app/core/api/client/association-api-client';
import { PaginatedResponse } from '@app/shared/utils/api/models/paginated-response';
import { PaginationRequest } from '@app/shared/utils/api/models/pagination-request';
import { map, Observable } from 'rxjs';

@Injectable()
export class MemberService {

  constructor(
    private client: AssociationApiClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Member[]>> {
    return this.client.member().page(pagination).sort(pagination?.sort).read();
  }

  public create(data: Member): Observable<Member> {
    return this.client.member().create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Member): Observable<Member> {
    return this.client.member().id(id).update(data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<Member> {
    return this.client.member().id(id).delete().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Member> {
    return this.client.member().id(id).read().pipe(map(r => r.content));
  }

  public countActive(): Observable<number> {
    return this.client.member().parameter("active", true).read().pipe(map(r => r.totalElements));
  }

}
