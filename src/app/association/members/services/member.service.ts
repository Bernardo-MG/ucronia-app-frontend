import { Injectable } from '@angular/core';
import { Member } from '@app/association/models/member';
import { AngularAssociationApiClient } from '@app/core/api/client/angular-association-api-client';
import { PaginatedResponse } from '@app/shared/utils/api/models/paginated-response';
import { PaginationRequest } from '@app/shared/utils/api/models/pagination-request';
import { map, Observable } from 'rxjs';

@Injectable()
export class MemberService {

  constructor(
    private client: AngularAssociationApiClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Member[]>> {
    return this.client.member().fetch(pagination);
  }

  public create(data: Member): Observable<Member> {
    return this.client.member().create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Member): Observable<Member> {
    return this.client.member().update(id, data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<Member> {
    return this.client.member().delete(id).pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Member> {
    return this.client.member().id(id).fetch().pipe(map(r => r.content));
  }

  public countActive(): Observable<number> {
    return this.client.member().parameter("active", true).fetch(undefined).pipe(map(r => r.totalElements));
  }

}
