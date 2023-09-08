import { Injectable } from '@angular/core';
import { AccessApiClient } from '@app/core/api/client/access-api-client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
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
    const defaultSort = new Sort<Role>('name');
    defaultSort.order = 'asc';

    const query = new PaginatedQuery<Role>();
    query.defaultSort = [defaultSort];
    query.pagination = pagination;

    return this.client.role().readAll(query);
  }

  public getPermissions(id: number, page: number): Observable<PaginatedResponse<Permission[]>> {
    const sortResource: Sort<Permission> = new Sort<Permission>('resource');
    const sortAction: Sort<Permission> = new Sort<Permission>('action');

    const query = new PaginatedQuery<Permission>();
    query.defaultSort = [sortResource, sortAction];
    query.page = page;

    return this.client.rolePermissions(id).readAll(query);
  }

  public getActionSelection(page: number): Observable<PaginatedResponse<Action[]>> {
    const sort = new Sort<Action>('name');

    const query = new PaginatedQuery<Action>();
    query.sort = [sort];
    query.page = page;

    return this.client.action().readAll(query);
  }

  public getResourceSelection(page: number): Observable<PaginatedResponse<Resource[]>> {
    const sort = new Sort<Resource>('name');

    const query = new PaginatedQuery<Resource>();
    query.sort = [sort];
    query.page = page;

    return this.client.resource().readAll(query);
  }

  public create(data: Role): Observable<Role> {
    return this.client.role().create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Role): Observable<Role> {
    return this.client.role().updateById(id, data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.client.role().deleteById(id).pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Role> {
    return this.client.role().readById(id).pipe(map(r => r.content));
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
