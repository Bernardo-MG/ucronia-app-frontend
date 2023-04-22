import { Injectable } from '@angular/core';
import { Fee } from '@app/association/models/fee';
import { Member } from '@app/association/models/member';
import { AngularAssociationApiClient } from '@app/core/api/client/angular-association-api-client';
import { PaginatedResponse } from '@app/shared/utils/api/models/paginated-response';
import { PaginationRequest } from '@app/shared/utils/api/models/pagination-request';
import { Sort } from '@app/shared/utils/api/models/sort';
import { map, Observable } from 'rxjs';

@Injectable()
export class FeeService {

  constructor(
    private client: AngularAssociationApiClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined, startDate: string | undefined, endDate: string | undefined): Observable<PaginatedResponse<Fee[]>> {
    const sort = new Sort<Fee>('date');
    sort.order = 'desc';

    return this.client.fee().page(pagination).sort([sort]).parameter("startDate", startDate).parameter("endDate", endDate).read();
  }

  public create(data: Fee): Observable<Fee> {
    return this.client.fee().create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Fee): Observable<Fee> {
    return this.client.fee().id(id).update(data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<Fee> {
    return this.client.fee().id(id).delete().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Fee> {
    return this.client.fee().id(id).read().pipe(map(r => r.content));
  }

  public getMembers(page: number): Observable<PaginatedResponse<Member[]>> {
    const sort: Sort<Member> = new Sort<Member>('name');
    return this.client.member().page({ page }).sort([sort]).read();
  }

  public getOneMember(id: number): Observable<Member> {
    return this.client.member().id(id).read().pipe(map(r => r.content));
  }

}
