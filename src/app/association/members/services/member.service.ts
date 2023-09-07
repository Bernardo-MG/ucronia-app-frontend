import { Injectable } from '@angular/core';
import { Member } from '@app/association/models/member';
import { AssociationApiClient } from '@app/core/api/client/association-api-client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { PaginatedQuery } from '@app/core/api/request/paginated-query';
import { map, Observable } from 'rxjs';

@Injectable()
export class MemberService {

  constructor(
    private client: AssociationApiClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Member[]>> {
    const defaultSortName = new Sort<Member>('name');
    defaultSortName.order = 'asc';
    const defaultSortSurname = new Sort<Member>('surname');
    defaultSortSurname.order = 'asc';

    const query = new PaginatedQuery<Member>();
    query.defaultSort = [defaultSortName, defaultSortSurname];
    query.pagination = pagination;

    return this.client.member().readAll(query);
  }

  public create(data: Member): Observable<Member> {
    return this.client.member().create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Member): Observable<Member> {
    return this.client.member().id(id).update(data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.client.member().id(id).delete().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Member> {
    return this.client.member().readById(id).pipe(map(r => r.content));
  }

}
