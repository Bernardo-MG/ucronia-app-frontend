import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Active } from '../../shared/models/active';
import { Member } from '../../shared/models/member';

@Injectable({
  providedIn: 'root'
})
export class PublicMemberService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(page: number, sort: Sort, active: Active): Observable<PaginatedResponse<Member[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortProperty('fullName'), new SortProperty('number')]);
    query.pagination = { page };
    query.sort = sort;
    query.addParameter('status', active.toString().toUpperCase());

    return this.getClient()
      .query(query)
      .read<PaginatedResponse<Member[]>>();
  }

  public getOne(number: number): Observable<Member> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Member>>()
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/member/public');
  }

}
