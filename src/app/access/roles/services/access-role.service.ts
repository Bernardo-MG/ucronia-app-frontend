import { Injectable } from '@angular/core';
import { Privilege } from '@app/core/authentication/models/privilege';
import { Role } from '@app/core/authentication/models/role';
import { PaginatedResponse } from '@app/shared/utils/api/models/paginated-response';
import { PaginationRequest } from '@app/shared/utils/api/models/pagination-request';
import { Sort } from '@app/shared/utils/api/models/sort';
import { CreateOperations } from '@app/shared/utils/api/request/create-operations';
import { DeleteOperations } from '@app/shared/utils/api/request/delete-operations';
import { ReadOperations } from '@app/shared/utils/api/request/read-operations';
import { ReadPagedOperations } from '@app/shared/utils/api/request/read-paged-operations';
import { RequestClient } from '@app/shared/utils/api/request/request-client';
import { UpdateOperations } from '@app/shared/utils/api/request/update-operations';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class AccessRoleService {

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

  public addPrivilege(id: number, privilege: number): Observable<boolean> {
    const clt: UpdateOperations<boolean> = this.client.update(`${this.roleUrl}/${id}/privilege`);
    return clt.body({ id: privilege }).push().pipe(map(r => r.content));
  }

  public removePrivilege(id: number, privilege: number): Observable<boolean> {
    const clt: DeleteOperations<boolean> = this.client.delete(`${this.roleUrl}/${id}/privilege`);
    return clt.id(privilege).push().pipe(map(r => r.content));
  }

}
