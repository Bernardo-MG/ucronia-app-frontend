import { Injectable } from '@angular/core';
import { AccessApiClient } from '@app/core/api/client/access-api-client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { Action } from '@app/core/authentication/models/action';
import { Permission } from '@app/core/authentication/models/permission';
import { Resource } from '@app/core/authentication/models/resource';
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

  public getPermissions(id: number, page: number): Observable<PaginatedResponse<Permission[]>> {
    const sortResource: Sort<Permission> = new Sort<Permission>('resource');
    const sortAction: Sort<Permission> = new Sort<Permission>('action');
    return this.client.rolePermissions(id).page({ page }).sort([sortResource, sortAction]).readAll();
  }

  public getActionSelection(page: number): Observable<PaginatedResponse<Action[]>> {
    const sort = new Sort<Action>('name');
    return this.client.action().page({ page }).sort([sort]).readAll();
  }

  public getResourceSelection(page: number): Observable<PaginatedResponse<Resource[]>> {
    const sort = new Sort<Resource>('name');
    return this.client.action().page({ page }).sort([sort]).readAll();
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

  public addPermission(id: number, resource: number, action: number): Observable<Permission> {
    return this.client.rolePermissions(id).update({
      resourceId: resource, actionId: action,
      roleId: 0,
      role: '',
      resource: '',
      action: ''
    }).pipe(map(r => r.content));
  }

  public removePermission(id: number, resource: number, action: number): Observable<boolean> {
    return this.client.rolePermission(id, resource, action).delete().pipe(map(r => r.content));
  }

}
