import { Injectable } from '@angular/core';
import { PaginatedResponse } from '@app/api/models/paginated-response';
import { PaginationRequest } from '@app/api/models/pagination-request';
import { CreateOperations } from '@app/api/request/create-operations';
import { DeleteOperations } from '@app/api/request/delete-operations';
import { ReadOperations } from '@app/api/request/read-operations';
import { RequestClient } from '@app/api/request/request-client';
import { UpdateOperations } from '@app/api/request/update-operations';
import { User } from '@app/security/models/user';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class SecurityUserService {

  private roleUrl = environment.apiUrl + "/security/user";

  constructor(
    private client: RequestClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<User[]>> {
    const clt: ReadOperations<User> = this.client.read(this.roleUrl);
    if (pagination) {
      clt.page(pagination);
      if (pagination.sort) {
        clt.sort(pagination.sort);
      }
    }
    return clt.fetchPaged();
  }

  public create(data: User): Observable<User> {
    const clt: CreateOperations<User> = this.client.create(this.roleUrl);
    return clt.body(data).pushUnwrapped();
  }

  public update(id: number, data: User): Observable<User> {
    const clt: UpdateOperations<User> = this.client.update(this.roleUrl);
    return clt.id(id).body(data).pushUnwrapped();
  }

  public delete(id: number): Observable<User> {
    const clt: DeleteOperations<User> = this.client.delete(this.roleUrl);
    return clt.id(id).pushUnwrapped();
  }

  public getOne(id: number): Observable<User> {
    const clt: ReadOperations<User> = this.client.read(this.roleUrl + `/${id}`);
    return clt.fetchOneUnwrapped();
  }

}
