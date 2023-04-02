import { Injectable } from '@angular/core';
import { Role } from '@app/core/security/models/role';
import { User } from '@app/core/security/models/user';
import { PaginatedResponse } from '@app/shared/api/models/paginated-response';
import { PaginationRequest } from '@app/shared/api/models/pagination-request';
import { Sort } from '@app/shared/api/models/sort';
import { CreateOperations } from '@app/shared/api/request/create-operations';
import { DeleteOperations } from '@app/shared/api/request/delete-operations';
import { ReadOperations } from '@app/shared/api/request/read-operations';
import { ReadPagedOperations } from '@app/shared/api/request/read-paged-operations';
import { RequestClient } from '@app/shared/api/request/request-client';
import { UpdateOperations } from '@app/shared/api/request/update-operations';
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
    const clt: ReadPagedOperations<User> = this.client.readPaged(this.userUrl);
    if (pagination) {
      clt.page(pagination);
      if (pagination.sort) {
        clt.sort(pagination.sort);
      }
    }
    return clt.fetch();
  }

  public getRoles(id: number, page: number): Observable<PaginatedResponse<Role[]>> {
    const clt: ReadPagedOperations<Role> = this.client.readPaged(`${this.userUrl}/${id}/role`);
    const sort: Sort<Role> = new Sort<Role>('name');
    clt.page({ page });
    clt.sort([sort]);
    return clt.fetch();
  }

  public getRoleSelection(page: number): Observable<PaginatedResponse<Role[]>> {
    const clt: ReadPagedOperations<Role> = this.client.readPaged(this.roleUrl);
    const sort: Sort<Role> = new Sort<Role>('name');
    clt.page({ page });
    clt.sort([sort]);
    return clt.fetch();
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
