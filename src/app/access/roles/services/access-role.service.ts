import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionApi } from '@app/access/api/action-api';
import { ResourceApi } from '@app/access/api/resource-api';
import { RoleApi } from '@app/access/api/role-api';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
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

  private actionApi = new ActionApi(this.http);

  private resourceApi = new ResourceApi(this.http);

  private roleApi = new RoleApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Role[]>> {
    const defaultSort = new Sort<Role>('name');
    defaultSort.order = 'asc';

    const query = new PaginatedQuery<Role>();
    query.defaultSort = [defaultSort];
    query.pagination = pagination;

    return this.roleApi.readAll(query);
  }

  public getPermissions(id: number, page: number): Observable<PaginatedResponse<Permission[]>> {
    const sortResource: Sort<Permission> = new Sort<Permission>('resource');
    const sortAction: Sort<Permission> = new Sort<Permission>('action');

    const query = new PaginatedQuery<Permission>();
    query.defaultSort = [sortResource, sortAction];
    query.page = page;

    return this.roleApi.readPermissions(id, query);
  }

  public getActionSelection(page: number): Observable<PaginatedResponse<Action[]>> {
    const sort = new Sort<Action>('name');

    const query = new PaginatedQuery<Action>();
    query.sort = [sort];
    query.page = page;

    return this.actionApi.readAll(query);
  }

  public getResourceSelection(page: number): Observable<PaginatedResponse<Resource[]>> {
    const sort = new Sort<Resource>('name');

    const query = new PaginatedQuery<Resource>();
    query.sort = [sort];
    query.page = page;

    return this.resourceApi.readAll(query);
  }

  public create(data: Role): Observable<Role> {
    return this.roleApi.create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Role): Observable<Role> {
    return this.roleApi.updateById(id, data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.roleApi.deleteById(id).pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Role> {
    return this.roleApi.readById(id).pipe(map(r => r.content));
  }

  public addPermission(id: number, resource: number, action: number): Observable<Permission> {
    return this.roleApi.updatePermission(id, resource, action).pipe(map(r => r.content));
  }

  public removePermission(id: number, resource: number, action: number): Observable<boolean> {
    return this.roleApi.removePermission(id, resource, action).pipe(map(r => r.content));
  }

}
