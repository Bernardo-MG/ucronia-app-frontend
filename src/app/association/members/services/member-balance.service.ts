import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberBalanceApi } from '@app/association/api/member-balance';
import { Direction } from '@app/core/api/models/direction';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { Sort } from '@app/core/api/models/sort';
import { Observable, map } from 'rxjs';
import { MemberBalance } from '../models/member-balance';

@Injectable()
export class MemberBalanceService {

  private memberBalanceApi = new MemberBalanceApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public monthly(startDate: string | undefined, endDate: string | undefined): Observable<MemberBalance[]> {
    const defaultSortDate = new Sort('month');
    defaultSortDate.direction = Direction.Ascending;

    const query = new PaginatedQuery<MemberBalance>();
    query.defaultSort = [defaultSortDate];
    query.addParameter("startDate", startDate);
    query.addParameter("endDate", endDate);

    return this.memberBalanceApi.readMonthly(query).pipe(map(r => r.content));
  }


}
