import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '@app/association/models/member';
import { MemberApi } from '@app/core/api/client/member-api';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { PaginatedQuery } from '@app/core/api/request/paginated-query';
import { map, Observable } from 'rxjs';

@Injectable()
export class MemberService {

  private memberApi = new MemberApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Member[]>> {
    const defaultSortName = new Sort<Member>('name');
    defaultSortName.order = 'asc';
    const defaultSortSurname = new Sort<Member>('surname');
    defaultSortSurname.order = 'asc';

    const query = new PaginatedQuery<Member>();
    query.defaultSort = [defaultSortName, defaultSortSurname];
    query.pagination = pagination;

    return this.memberApi.readAll(query);
  }

  public create(data: Member): Observable<Member> {
    return this.memberApi.create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Member): Observable<Member> {
    return this.memberApi.updateById(id, data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.memberApi.deleteById(id).pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Member> {
    return this.memberApi.readById(id).pipe(map(r => r.content));
  }

}
