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

  public getPermissions(role: string, pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Permission[]>> {
    const sortResource: Sort<Permission> = new Sort<Permission>('resource');
    const sortAction: Sort<Permission> = new Sort<Permission>('action');

    const query = new PaginatedQuery<Permission>();
    query.defaultSort = [sortResource, sortAction];
    query.pagination = pagination;

    return this.roleApi.readPermissions(role, query);
  }

  public getAvailablePermissions(role: string, pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Permission[]>> {
    const sortResource: Sort<Permission> = new Sort<Permission>('resource');
    const sortAction: Sort<Permission> = new Sort<Permission>('action');

    const query = new PaginatedQuery<Permission>();
    query.defaultSort = [sortResource, sortAction];
    query.pagination = pagination;

    return this.roleApi.readAvailablePermissions(role, query);
  }

  public create(data: Role): Observable<Role> {
    return this.roleApi.create(data).pipe(map(r => r.content));
  }

  public update(role: string, data: Role): Observable<Role> {
    return this.roleApi.updateById(role, data).pipe(map(r => r.content));
  }

  public delete(role: string): Observable<boolean> {
    return this.roleApi.deleteById(role).pipe(map(r => r.content));
  }

  public getOne(role: string): Observable<Role> {
    return this.roleApi.readById(role).pipe(map(r => r.content));
  }

  public addPermission(role: string, permission: string): Observable<Permission> {
    return this.roleApi.updatePermission(role, permission).pipe(map(r => r.content));
  }

  public removePermission(role: string, permission: string): Observable<boolean> {
    return this.roleApi.removePermission(role, permission).pipe(map(r => r.content));
  }

}
