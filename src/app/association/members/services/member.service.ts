import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { AngularRequest } from '@app/core/api/request/angular-request';
import { Request } from '@app/core/api/request/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { Active } from '../models/active';
import { Member } from '../models/member';

@Injectable()
export class MemberService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(page: number, sort: Sort, active: Active): Observable<PaginatedResponse<Member[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortField('fullName'), new SortField('number')]);
    query.pagination = { page };
    query.sort = sort;
    query.addParameter('status', active.toString().toUpperCase());

    return this.getRequest().query(query).read();
  }

  public create(data: Member): Observable<Member> {
    return this.getRequest().create<ApiResponse<Member>>(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Member): Observable<Member> {
    return this.getRequest().appendRoute(`/${id}`).update<ApiResponse<Member>>(data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.getRequest().appendRoute(`/${id}`).delete<ApiResponse<boolean>>().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Member> {
    return this.getRequest().appendRoute(`/${id}`).read<ApiResponse<Member>>().pipe(map(r => r.content));
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/member');
  }

}
