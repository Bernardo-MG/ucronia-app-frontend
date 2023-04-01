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
import { Privilege } from '@app/core/models/privilege';
import { Role } from '@app/core/models/role';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class SecurityRoleService {

  private roleUrl = environment.apiUrl + "/security/role";

  private privilegeUrl = environment.apiUrl + "/security/privilege";

  constructor(
    private client: RequestClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Role[]>> {
    const clt: ReadPagedOperations<Role> = this.client.readPaged(this.roleUrl);
    if (pagination) {
      clt.page(pagination);
      if (pagination.sort) {
        clt.sort(pagination.sort);
      }
    }
    return clt.fetch();
  }

  public getPrivileges(id: number, page: number): Observable<PaginatedResponse<Privilege[]>> {
    const clt: ReadPagedOperations<Privilege> = this.client.readPaged(`${this.roleUrl}/${id}/privilege`);
    const sort: Sort<Privilege> = new Sort<Privilege>('name');
    clt.page({ page });
    clt.sort([sort]);
    return clt.fetch();
  }

  public getPrivilegeSelection(page: number): Observable<PaginatedResponse<Privilege[]>> {
    const clt: ReadPagedOperations<Privilege> = this.client.readPaged(this.privilegeUrl);
    const sort: Sort<Privilege> = new Sort<Privilege>('name');
    clt.page({ page });
    clt.sort([sort]);
    return clt.fetch();
  }

  public create(data: Role): Observable<Role> {
    const clt: CreateOperations<Role> = this.client.create(this.roleUrl);
    return clt.body(data).push().pipe(map(r => r.content));
  }

  public update(id: number, data: Role): Observable<Role> {
    const clt: UpdateOperations<Role> = this.client.update(this.roleUrl);
    return clt.id(id).body(data).push().pipe(map(r => r.content));
  }

  public delete(id: number): Observable<Role> {
    const clt: DeleteOperations<Role> = this.client.delete(this.roleUrl);
    return clt.id(id).push().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Role> {
    const clt: ReadOperations<Role> = this.client.read(this.roleUrl + `/${id}`);
    return clt.fetchOne().pipe(map(r => r.content));
  }

  public addPrivilege(id: number, privilege: number): Observable<Boolean> {
    const clt: UpdateOperations<Boolean> = this.client.update(`${this.roleUrl}/${id}/privilege`);
    return clt.body({ id: privilege }).push().pipe(map(r => r.content));
  }

  public removePrivilege(id: number, privilege: number): Observable<Boolean> {
    const clt: DeleteOperations<Boolean> = this.client.delete(`${this.roleUrl}/${id}/privilege`);
    return clt.id(privilege).push().pipe(map(r => r.content));
  }

}
