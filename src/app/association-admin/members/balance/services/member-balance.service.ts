import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortDirection } from '@app/core/api/models/sort-direction';
import { SortProperty } from '@app/core/api/models/sort-field';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { MemberBalance } from '../../../../models/members/member-balance';

@Injectable({
  providedIn: "root"
})
export class MemberBalanceService {

  constructor(
    private http: HttpClient
  ) { }

  public monthly(startDate: string | undefined, endDate: string | undefined): Observable<MemberBalance[]> {
    const defaultSortDate = new SortProperty('month');
    defaultSortDate.direction = SortDirection.Ascending;

    const query = new PaginatedQuery();
    query.defaultSort = new Sort([defaultSortDate]);
    query.addParameter("startDate", startDate);
    query.addParameter("endDate", endDate);

    return this.getClient()
      .query(query)
      .read<SimpleResponse<MemberBalance[]>>()
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/member/monthly');
  }

}
