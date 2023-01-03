import { Injectable } from '@angular/core';
import { PaginatedResponse } from '@app/api/models/paginated-response';
import { PaginationRequest } from '@app/api/models/pagination-request';
import { Sort } from '@app/api/models/sort';
import { CreateOperations } from '@app/api/request/create-operations';
import { DeleteOperations } from '@app/api/request/delete-operations';
import { ReadOperations } from '@app/api/request/read-operations';
import { ReadPagedOperations } from '@app/api/request/read-paged-operations';
import { RequestClient } from '@app/api/request/request-client';
import { UpdateOperations } from '@app/api/request/update-operations';
import { Fee } from '@app/models/fee';
import { Member } from '@app/models/member';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class FeeService {

  private feeUrl = environment.apiUrl + "/fee";

  private memberUrl = environment.apiUrl + "/member";

  constructor(
    private client: RequestClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined, startDate: Date | undefined, endDate: Date | undefined): Observable<PaginatedResponse<Fee[]>> {
    const clt: ReadPagedOperations<Fee> = this.client.readPaged(this.feeUrl);
    if (pagination) {
      clt.page(pagination);
      if (pagination.sort) {
        clt.sort(pagination.sort);
      }
    }
    if (startDate) {
      clt.parameter("startDate", startDate);
    }
    if (endDate) {
      clt.parameter("endDate", endDate);
    }
    return clt.fetch();
  }

  public create(data: Fee): Observable<Fee> {
    const clt: CreateOperations<Fee> = this.client.create(this.feeUrl);
    return clt.body(data).push().pipe(map(r => r.content));
  }

  public update(id: number, data: Fee): Observable<Fee> {
    const clt: UpdateOperations<Fee> = this.client.update(this.feeUrl);
    return clt.id(id).body(data).push().pipe(map(r => r.content));
  }

  public delete(id: number): Observable<Fee> {
    const clt: DeleteOperations<Fee> = this.client.delete(this.feeUrl);
    return clt.id(id).push().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Fee> {
    const clt: ReadOperations<Fee> = this.client.read(this.feeUrl + `/${id}`);
    return clt.fetchOne().pipe(map(r => r.content));
  }

  public getMembers(page: number): Observable<PaginatedResponse<Member[]>> {
    const clt: ReadPagedOperations<Member> = this.client.readPaged(this.memberUrl);
    const sort: Sort<Member> = new Sort<Member>('name');
    clt.page({ page });
    clt.sort([sort]);
    return clt.fetch();
  }

  public getOneMember(id: number): Observable<Member> {
    const clt: ReadOperations<Member> = this.client.read(this.memberUrl + `/${id}`);
    return clt.fetchOne().pipe(map(r => r.content));
  }

}
