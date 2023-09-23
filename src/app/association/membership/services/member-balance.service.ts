import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberApi } from '@app/association/api/member-api';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { Sort } from '@app/core/api/models/sort';
import { Observable, map } from 'rxjs';
import { MemberBalance } from '../models/member-balance';

@Injectable()
export class MemberBalanceService {

  private memberApi = new MemberApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public monthly(startDate: string | undefined, endDate: string | undefined): Observable<MemberBalance[]> {
    const defaultSortDate = new Sort<MemberBalance>('month');
    defaultSortDate.order = 'asc';

    const query = new PaginatedQuery<MemberBalance>();
    query.defaultSort = [defaultSortDate];
    query.addParameter("startDate", startDate);
    query.addParameter("endDate", endDate);

    return this.memberApi.readMonthly(query).pipe(map(r => r.content));
  }


}
