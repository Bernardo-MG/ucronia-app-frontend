import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleApi } from '@app/access/api/role-api';
import { Direction } from '@app/core/api/models/direction';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { Permission } from '@app/core/authentication/models/permission';
import { Role } from '@app/core/authentication/models/role';
import { map, Observable } from 'rxjs';

@Injectable()
export class AccessRoleService {

  private roleApi = new RoleApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Role[]>> {
    const defaultSort = new Sort<Role>('name');
    defaultSort.direction = Direction.Ascending;

    const query = new PaginatedQuery<Role>();
    query.defaultSort = [defaultSort];
    query.pagination = pagination;

    return this.roleApi.readAll(query);
  }

  public getPermissions(roleId: number, pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Permission[]>> {
    const sortResource: Sort<Permission> = new Sort<Permission>('resource');
    const sortAction: Sort<Permission> = new Sort<Permission>('action');

    const query = new PaginatedQuery<Permission>();
    query.defaultSort = [sortResource, sortAction];
    query.pagination = pagination;

    return this.roleApi.readPermissions(roleId, query);
  }

  public getAvailablePermissions(roleId: number, pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Permission[]>> {
    const sortResource: Sort<Permission> = new Sort<Permission>('resource');
    const sortAction: Sort<Permission> = new Sort<Permission>('action');

    const query = new PaginatedQuery<Permission>();
    query.defaultSort = [sortResource, sortAction];
    query.pagination = pagination;

    return this.roleApi.readAvailablePermissions(roleId, query);
  }

  public create(data: Role): Observable<Role> {
    return this.roleApi.create(data).pipe(map(r => r.content));
  }

  public update(roleId: number, data: Role): Observable<Role> {
    return this.roleApi.updateById(roleId, data).pipe(map(r => r.content));
  }

  public delete(roleId: number): Observable<boolean> {
    return this.roleApi.deleteById(roleId).pipe(map(r => r.content));
  }

  public getOne(roleId: number): Observable<Role> {
    return this.roleApi.readById(roleId).pipe(map(r => r.content));
  }

  public addPermission(roleId: number, permission: number): Observable<Permission> {
    return this.roleApi.updatePermission(roleId, permission).pipe(map(r => r.content));
  }

  public removePermission(roleId: number, permission: number): Observable<boolean> {
    return this.roleApi.removePermission(roleId, permission).pipe(map(r => r.content));
  }

}
