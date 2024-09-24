import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Active } from '@app/association/members/shared/models/active';
import { Member } from '@app/association/members/shared/models/member';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { Fee } from '../../shared/models/fee';
import { FeePayment } from '../../shared/models/fee-payment';

@Injectable({
  providedIn: "root"
})
export class FeeService {

  constructor(
    private http: HttpClient
  ) { }

  public pay(data: FeePayment): Observable<FeePayment> {
    return this.getClient()
      .create<SimpleResponse<FeePayment>>(data)
      .pipe(map(r => r.content));
  }

  public update(date: string, memberNumber: number, data: Fee): Observable<Fee> {
    return this.getClient()
      .appendRoute(`/${date}/${memberNumber}`)
      .update<SimpleResponse<Fee>>(data)
      .pipe(map(r => r.content));
  }

  public delete(date: string, memberNumber: number): Observable<boolean> {
    return this.getClient()
      .appendRoute(`/${date}/${memberNumber}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getOne(date: string, memberNumber: number): Observable<Fee> {
    return this.getClient()
      .appendRoute(`/${date}/${memberNumber}`)
      .read<SimpleResponse<Fee>>()
      .pipe(map(r => r.content));
  }

  public getMembers(page: number, active: Active): Observable<PaginatedResponse<Member[]>> {
    const query = new PaginatedQuery();
    query.sort = new Sort([new SortProperty('fullName'), new SortProperty('number')]);
    query.page = page;
    query.addParameter('status', active.toString().toUpperCase());

    return this.getMemberClient()
      .query(query)
      .read<PaginatedResponse<Member[]>>();
  }

  public getOneMember(id: number): Observable<Member> {
    return this.getMemberClient()
      .appendRoute(`/${id}`)
      .read<SimpleResponse<Member>>()
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/fee');
  }

  private getMemberClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/member');
  }

}
