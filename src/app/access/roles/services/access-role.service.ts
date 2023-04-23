import { Injectable } from '@angular/core';
import { AccessApiClient } from '@app/core/api/client/access-api-client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { Privilege } from '@app/core/authentication/models/privilege';
import { Role } from '@app/core/authentication/models/role';
import { DeleteOperations } from '@app/shared/utils/api/request/delete-operations';
import { ReadPagedOperations } from '@app/shared/utils/api/request/read-paged-operations';
import { RequestClient } from '@app/shared/utils/api/request/request-client';
import { UpdateOperations } from '@app/shared/utils/api/request/update-operations';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class AccessRoleService {

  private roleUrl = environment.apiUrl + "/security/role";

  constructor(
    private client: RequestClient,
    private newClient: AccessApiClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Role[]>> {
    return this.newClient.role().page(pagination).sort(pagination?.sort).readAll();
  }

  public getPrivileges(id: number, page: number): Observable<PaginatedResponse<Privilege[]>> {
    const sort: Sort<Privilege> = new Sort<Privilege>('name');
    return this.newClient.rolePrivileges(id).page({ page }).sort([sort]).readAll();
  }

  public getPrivilegeSelection(page: number): Observable<PaginatedResponse<Privilege[]>> {
    const sort = new Sort<Privilege>('name');
    return this.newClient.privilege().page({ page }).sort([sort]).readAll();
  }

  public create(data: Role): Observable<Role> {
    return this.newClient.role().create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Role): Observable<Role> {
    return this.newClient.role().id(id).update(data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.newClient.role().id(id).delete().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Role> {
    return this.newClient.role().id(id).readOne().pipe(map(r => r.content));
  }

  public addPrivilege(id: number, privilege: number): Observable<boolean> {
    const clt: UpdateOperations<boolean> = this.client.update(`${this.roleUrl}/${id}/privilege`);
    return clt.body({ id: privilege }).push().pipe(map(r => r.content));
    // return this.newClient.rolePrivileges(id).update({ id: privilege }).pipe(map(r => r.content));
  }

  public removePrivilege(id: number, privilege: number): Observable<boolean> {
    const clt: DeleteOperations<boolean> = this.client.delete(`${this.roleUrl}/${id}/privilege`);
    return clt.id(privilege).push().pipe(map(r => r.content));
  }

}
