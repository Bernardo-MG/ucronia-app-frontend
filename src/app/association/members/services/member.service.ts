import { Injectable } from '@angular/core';
import { PaginatedResponse } from '@app/api/models/paginated-response';
import { PaginationRequest } from '@app/api/models/pagination-request';
import { CreateOperations } from '@app/api/request/create-operations';
import { DeleteOperations } from '@app/api/request/delete-operations';
import { ReadOperations } from '@app/api/request/read-operations';
import { ReadPagedOperations } from '@app/api/request/read-paged-operations';
import { RequestClient } from '@app/api/request/request-client';
import { UpdateOperations } from '@app/api/request/update-operations';
import { Member } from '@app/association/models/member';
import { environment } from 'environments/environment';
import { map, Observable, ObservedValueOf } from 'rxjs';

@Injectable()
export class MemberService {

  private memberUrl = environment.apiUrl + "/member";

  constructor(
    private client: RequestClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Member[]>> {
    const clt: ReadPagedOperations<Member> = this.client.readPaged(this.memberUrl);
    if (pagination) {
      clt.page(pagination);
      if (pagination.sort) {
        clt.sort(pagination.sort);
      }
    }
    return clt.fetch();
  }

  public create(data: Member): Observable<Member> {
    const clt: CreateOperations<Member> = this.client.create(this.memberUrl);
    return clt.body(data).push().pipe(map(r => r.content));
  }

  public update(id: number, data: Member): Observable<Member> {
    const clt: UpdateOperations<Member> = this.client.update(this.memberUrl);
    return clt.id(id).body(data).push().pipe(map(r => r.content));
  }

  public delete(id: number): Observable<Member> {
    const clt: DeleteOperations<Member> = this.client.delete(this.memberUrl);
    return clt.id(id).push().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Member> {
    const clt: ReadOperations<Member> = this.client.read(this.memberUrl + `/${id}`);
    return clt.fetchOne().pipe(map(r => r.content));
  }

  public countActive(): Observable<number> {
    const clt: ReadPagedOperations<Member> = this.client.readPaged(this.memberUrl);

    clt.parameter("active", true);
    return clt.fetch().pipe(map(r => r.totalElements));
  }

}
