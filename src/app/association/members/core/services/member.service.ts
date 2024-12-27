import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Active } from '@app/association/members/model/active';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Member } from '../../../../models/members/member';
import { SortingParams } from '@app/core/api/models/sorting-params';
import { PaginationParams } from '@app/core/api/models/pagination-params';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(page: number, sort: Sort): Observable<PaginatedResponse<Member[]>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortProperty('firstName'), new SortProperty('lastName'), new SortProperty('number')]
    );

    return this.getClient()
      .parameters(new PaginationParams(page))
      .parameters(sorting)
      .parameter('status', Active.Active.toString().toUpperCase())
      .read<PaginatedResponse<Member[]>>();
  }

  public getOne(number: number): Observable<Member> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Member>>()
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/member');
  }

}
