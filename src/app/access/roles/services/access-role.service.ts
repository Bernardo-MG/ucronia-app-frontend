import { Injectable } from '@angular/core';
import { AccessApiClient } from '@app/core/api/client/access-api-client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { Privilege } from '@app/core/authentication/models/privilege';
import { Role } from '@app/core/authentication/models/role';
import { map, Observable } from 'rxjs';

@Injectable()
export class AccessRoleService {

  constructor(
    private client: AccessApiClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Role[]>> {
    return this.client.role().page(pagination).sort(pagination?.sort).readAll();
  }

  public getPrivileges(id: number, page: number): Observable<PaginatedResponse<Privilege[]>> {
    const sort: Sort<Privilege> = new Sort<Privilege>('name');
    return this.client.rolePrivileges(id).page({ page }).sort([sort]).readAll();
  }

  public getPrivilegeSelection(page: number): Observable<PaginatedResponse<Privilege[]>> {
    const sort = new Sort<Privilege>('name');
    return this.client.privilege().page({ page }).sort([sort]).readAll();
  }

  public create(data: Role): Observable<Role> {
    return this.client.role().create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Role): Observable<Role> {
    return this.client.role().id(id).update(data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.client.role().id(id).delete().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Role> {
    return this.client.role().id(id).readOne().pipe(map(r => r.content));
  }

  public addPrivilege(id: number, privilege: number): Observable<boolean> {
    return this.client.rolePrivileges(id).update({ id: privilege }).pipe(map(r => r.content));
  }

  public removePrivilege(id: number, privilege: number): Observable<boolean> {
    return this.client.rolePrivileges(id).delete(privilege).pipe(map(r => r.content));
  }

}
