import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResponse } from '@app/api/models/paginated-response';
import { PaginationRequest } from '@app/api/models/pagination-request';
import { Sort } from '@app/api/models/sort';
import { CreateOperations } from '@app/api/request/create-operations';
import { DeleteOperations } from '@app/api/request/delete-operations';
import { ReadOperations } from '@app/api/request/read-operations';
import { RequestClient } from '@app/api/request/request-client';
import { UpdateOperations } from '@app/api/request/update-operations';
import { RoutePaginationObserver } from '@app/api/route/observer/route-pagination-observer';
import { Fee } from '@app/models/fee';
import { Member } from '@app/models/member';
import { environment } from 'environments/environment';
import { EMPTY, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  private feeUrl = environment.apiUrl + "/fee";

  private memberUrl = environment.apiUrl + "/member";

  private routePaginationObserver: RoutePaginationObserver;

  constructor(
    private client: RequestClient,
    route: ActivatedRoute
  ) {
    this.routePaginationObserver = new RoutePaginationObserver(route);
  }

  public getAll(): Observable<PaginatedResponse<Fee[]>> {
    // Listens for changes on pagination params and reads again
    return this.routePaginationObserver.pagination.pipe(mergeMap(p => {
      let result;

      if (p) {
        result = this.read(p);
      } else {
        result = EMPTY;
      }

      return result;
    }));
  }

  public create(fee: Fee): Observable<Fee> {
    const clt: CreateOperations<Fee> = this.client.create(this.feeUrl);
    return clt.body(fee).pushUnwrapped();
  }

  public update(id: number, member: Fee): Observable<Fee> {
    const clt: UpdateOperations<Fee> = this.client.update(this.feeUrl);
    return clt.id(id).body(member).pushUnwrapped();
  }

  public delete(id: number): Observable<Fee> {
    const clt: DeleteOperations<Fee> = this.client.delete(this.feeUrl);
    return clt.id(id).pushUnwrapped();
  }

  public getOne(id: number): Observable<Fee> {
    const clt: ReadOperations<Fee> = this.client.read(this.feeUrl + `/${id}`);
    return clt.fetchOneUnwrapped();
  }

  public getMembers(page: number): Observable<PaginatedResponse<Member[]>> {
    const clt: ReadOperations<Member> = this.client.read(this.memberUrl);
    const sort: Sort<Member> = new Sort<Member>('name');
    clt.page({ page });
    clt.sort([sort]);
    return clt.fetchPaged();
  }

  public getOneMember(id: number): Observable<Member> {
    const clt: ReadOperations<Member> = this.client.read(this.memberUrl + `/${id}`);
    return clt.fetchOneUnwrapped();
  }

  private read(pagination: PaginationRequest): Observable<PaginatedResponse<Fee[]>> {
    const clt: ReadOperations<Fee> = this.client.read(this.feeUrl);
    clt.page(pagination);
    if (pagination.sort) {
      clt.sort(pagination.sort);
    }
    return clt.fetchPaged();
  }

}
