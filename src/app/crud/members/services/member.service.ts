import { Injectable } from '@angular/core';
import { PaginatedResponse } from '@app/api/models/paginated-response';
import { Pagination } from '@app/api/models/pagination';
import { CreateOperations } from '@app/api/request/create-operations';
import { DeleteOperations } from '@app/api/request/delete-operations';
import { ReadOperations } from '@app/api/request/read-operations';
import { RequestClient } from '@app/api/request/request-client';
import { UpdateOperations } from '@app/api/request/update-operations';
import { Member } from '@app/models/member';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private memberUrl = environment.apiUrl + "/member";

  constructor(
    private client: RequestClient
  ) { }

  public getAll(pagination: Pagination): Observable<PaginatedResponse<Member[]>> {
    const clt: ReadOperations<Member> = this.client.read(this.memberUrl);
    clt.page(pagination);
    return clt.fetchPaged();
  }

  public create(member: Member): Observable<Member> {
    const clt: CreateOperations<Member> = this.client.create(this.memberUrl);
    return clt.body(member).pushUnwrapped();
  }

  public update(id: number, member: Member): Observable<Member> {
    const clt: UpdateOperations<Member> = this.client.update(this.memberUrl);
    return clt.id(id).body(member).pushUnwrapped();
  }

  public delete(id: number): Observable<Member> {
    const clt: DeleteOperations<Member> = this.client.delete(this.memberUrl);
    return clt.id(id).pushUnwrapped();
  }

  public getOne(id: number): Observable<Member> {
    const clt: ReadOperations<Member> = this.client.read(this.memberUrl + `/${id}`);
    return clt.fetchOneUnwrapped();
  }

}
