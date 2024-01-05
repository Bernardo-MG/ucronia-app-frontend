import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeeApi } from '@app/association/api/fee-api';
import { MemberApi } from '@app/association/api/member-api';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { map, Observable } from 'rxjs';
import { Fee } from '../models/fee';
import { FeePayment } from '../models/fee-payment';
import { Member } from '../models/member';

@Injectable()
export class FeeService {

  private feeApi = new FeeApi(this.http);

  private memberApi = new MemberApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public pay(data: FeePayment): Observable<FeePayment> {
    return this.feeApi.pay(data).pipe(map(r => r.content));
  }

  public update(date: string, memberNumber: number, data: Fee): Observable<Fee> {
    return this.feeApi.updateById(date, memberNumber, data).pipe(map(r => r.content));
  }

  public delete(date: string, memberNumber: number): Observable<boolean> {
    return this.feeApi.deleteById(date, memberNumber).pipe(map(r => r.content));
  }

  public getOne(date: string, memberNumber: number): Observable<Fee> {
    return this.feeApi.readById(date, memberNumber).pipe(map(r => r.content));
  }

  public getMembers(page: number): Observable<PaginatedResponse<Member[]>> {
    const query = new PaginatedQuery<Member>();
    query.sort = [new Sort<Member>('fullName'), new Sort<Member>('number')];
    query.page = page;

    return this.memberApi.readAll(query);
  }

  public getOneMember(id: number): Observable<Member> {
    return this.memberApi.readById(id).pipe(map(r => r.content));
  }

}
