import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Active } from '@app/models/members/active';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { PublicMember } from '../../../../models/members/public-member';

@Injectable({
  providedIn: 'root'
})
export class PublicMemberService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(page: number, sort: Sort): Observable<PaginatedResponse<PublicMember[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortProperty('fullName'), new SortProperty('number')]);
    query.pagination = { page };
    query.sort = sort;
    query.addParameter('status', Active.Active.toString().toUpperCase());

    return this.getClient()
      .query(query)
      .read<PaginatedResponse<PublicMember[]>>();
  }

  public getOne(number: number): Observable<PublicMember> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .read<SimpleResponse<PublicMember>>()
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/member/public');
  }

}
