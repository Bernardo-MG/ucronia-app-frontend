import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { AngularRequest } from '@app/core/api/request/angular-request';
import { Request } from '@app/core/api/request/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { Member } from '../../members/models/member';
import { Fee } from '../models/fee';
import { FeePayment } from '../models/fee-payment';

@Injectable()
export class FeeService {

  constructor(
    private http: HttpClient
  ) { }

  public pay(data: FeePayment): Observable<FeePayment> {
    return this.getRequest().create<ApiResponse<FeePayment>>(data).pipe(map(r => r.content));
  }

  public update(date: string, memberNumber: number, data: Fee): Observable<Fee> {
    return this.getRequest().appendRoute(`/${date}/${memberNumber}`).update<ApiResponse<Fee>>(data).pipe(map(r => r.content));
  }

  public delete(date: string, memberNumber: number): Observable<boolean> {
    return this.getRequest().appendRoute(`/${date}/${memberNumber}`).delete<ApiResponse<boolean>>().pipe(map(r => r.content));
  }

  public getOne(date: string, memberNumber: number): Observable<Fee> {
    return this.getRequest().appendRoute(`/${date}/${memberNumber}`).read<ApiResponse<Fee>>().pipe(map(r => r.content));
  }

  public getMembers(page: number): Observable<PaginatedResponse<Member[]>> {
    const query = new PaginatedQuery();
    query.sort = [new Sort('fullName'), new Sort('number')];
    query.page = page;

    return this.getMemberRequest().query(query).read();
  }

  public getOneMember(id: number): Observable<Member> {
    return this.getMemberRequest().appendRoute(`/${id}`).read<ApiResponse<Member>>().pipe(map(r => r.content));
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/fee');
  }

  private getMemberRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/member');
  }

}
