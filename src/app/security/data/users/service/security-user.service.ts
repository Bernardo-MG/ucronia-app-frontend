import { Injectable } from '@angular/core';
import { PaginatedResponse } from '@app/api/models/paginated-response';
import { PaginationRequest } from '@app/api/models/pagination-request';
import { Sort } from '@app/api/models/sort';
import { CreateOperations } from '@app/api/request/create-operations';
import { DeleteOperations } from '@app/api/request/delete-operations';
import { ReadOperations } from '@app/api/request/read-operations';
import { RequestClient } from '@app/api/request/request-client';
import { UpdateOperations } from '@app/api/request/update-operations';
import { Role } from '@app/security/models/role';
import { User } from '@app/security/models/user';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class SecurityUserService {

  private userUrl = environment.apiUrl + "/security/user";

  private roleUrl = environment.apiUrl + "/security/role";

  constructor(
    private client: RequestClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<User[]>> {
    const clt: ReadOperations<User> = this.client.read(this.userUrl);
    if (pagination) {
      clt.page(pagination);
      if (pagination.sort) {
        clt.sort(pagination.sort);
      }
    }
    return clt.fetchPaged();
  }

  public getRoles(id: number, page: number): Observable<PaginatedResponse<Role[]>> {
    const clt: ReadOperations<Role> = this.client.read(`${this.userUrl}/${id}/role`);
    const sort: Sort<Role> = new Sort<Role>('name');
    clt.page({ page });
    clt.sort([sort]);
    return clt.fetchPaged();
  }

  public getRoleSelection(page: number): Observable<PaginatedResponse<Role[]>> {
    const clt: ReadOperations<Role> = this.client.read(this.roleUrl);
    const sort: Sort<Role> = new Sort<Role>('name');
    clt.page({ page });
    clt.sort([sort]);
    return clt.fetchPaged();
  }

  public create(data: User): Observable<User> {
    const clt: CreateOperations<User> = this.client.create(this.userUrl);
    return clt.body(data).push().pipe(map(r => r.content));
  }

  public update(id: number, data: User): Observable<User> {
    const clt: UpdateOperations<User> = this.client.update(this.userUrl);
    return clt.id(id).body(data).push().pipe(map(r => r.content));
  }

  public delete(id: number): Observable<User> {
    const clt: DeleteOperations<User> = this.client.delete(this.userUrl);
    return clt.id(id).push().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<User> {
    const clt: ReadOperations<User> = this.client.read(this.userUrl + `/${id}`);
    return clt.fetchOne().pipe(map(r => r.content));
  }

  public addRole(id: number, role: number): Observable<Boolean> {
    const clt: UpdateOperations<Boolean> = this.client.update(`${this.userUrl}/${id}/role`);
    return clt.body({ id: role }).push().pipe(map(r => r.content));
  }

  public removeRole(id: number, role: number): Observable<Boolean> {
    const clt: DeleteOperations<Boolean> = this.client.delete(`${this.userUrl}/${id}/role`);
    return clt.id(role).push().pipe(map(r => r.content));
  }

}
