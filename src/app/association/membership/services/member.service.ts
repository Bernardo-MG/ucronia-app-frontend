import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberApi } from '@app/association/api/member-api';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { map, Observable } from 'rxjs';
import { Active } from '../models/active';
import { Member } from '../models/member';
import { Direction } from '@app/core/api/models/direction';

@Injectable()
export class MemberService {

  private memberApi = new MemberApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined, active: Active): Observable<PaginatedResponse<Member[]>> {
    const defaultSortName = new Sort<Member>('name');
    defaultSortName.direction = Direction.Ascending;
    const defaultSortSurname = new Sort<Member>('surname');
    defaultSortSurname.direction = Direction.Ascending;

    const query = new PaginatedQuery<Member>();
    query.defaultSort = [defaultSortName, defaultSortSurname];
    query.pagination = pagination;
    if (active === Active.Active) {
      query.addParameter("status", 'ACTIVE');
    } else if (active === Active.Inactive) {
      query.addParameter("status", 'INACTIVE');
    }

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
