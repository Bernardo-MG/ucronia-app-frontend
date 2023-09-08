import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
import { FeeApi } from '@app/core/api/client/fee-api';
import { MemberApi } from '@app/core/api/client/member-api';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { map, Observable } from 'rxjs';
import { FeePayment } from '../models/fee-payment';

@Injectable()
export class FeeService {

  private feeApi = new FeeApi(this.http);

  private memberApi = new MemberApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined, startDate: string | undefined, endDate: string | undefined): Observable<PaginatedResponse<Fee[]>> {
    const defaultSortName = new Sort<Fee>('memberName');
    defaultSortName.order = 'asc';
    const defaultSortDate = new Sort<Fee>('date');
    defaultSortDate.order = 'desc';

    const query = new PaginatedQuery<Fee>();
    query.defaultSort = [defaultSortDate, defaultSortName];
    query.pagination = pagination;
    query.addParameter("startDate", startDate);
    query.addParameter("endDate", endDate);

    return this.feeApi.readAll(query);
  }

  public pay(data: FeePayment): Observable<FeePayment> {
    return this.feeApi.pay(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Fee): Observable<Fee> {
    return this.feeApi.updateById(id, data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.feeApi.deleteById(id).pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Fee> {
    return this.feeApi.readById(id).pipe(map(r => r.content));
  }

  public getMembers(page: number): Observable<PaginatedResponse<Member[]>> {
    const query = new PaginatedQuery<Member>();
    query.sort = [new Sort<Member>('name')];
    query.page = page;

    return this.memberApi.readAll(query);
  }

  public getOneMember(id: number): Observable<Member> {
    // return this.feeApi.member().readById(id).pipe(map(r => r.content));
    return this.memberApi.readById(id).pipe(map(r => r.content));
  }

}
