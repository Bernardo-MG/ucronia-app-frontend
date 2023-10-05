import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleApi } from '@app/access/api/role-api';
import { UserApi } from '@app/access/api/user-api';
import { Direction } from '@app/core/api/models/direction';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { map, Observable } from 'rxjs';

@Injectable()
export class AccessUserService {

  private userApi = new UserApi(this.http);

  private roleApi = new RoleApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<User[]>> {
    const defaultSort = new Sort<User>('name');
    defaultSort.direction = Direction.Ascending;

    const query = new PaginatedQuery<User>();
    query.defaultSort = [defaultSort];
    query.pagination = pagination;

    return this.userApi.readAll(query);
  }

  public getRoles(userId: number, pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Role[]>> {
    const defaultSort: Sort<Role> = new Sort<Role>('name');

    const query = new PaginatedQuery<Role>();
    query.defaultSort = [defaultSort];
    query.pagination = pagination;

    return this.userApi.readRoles(userId, query);
  }

  public getAvailableRoles(userId: number, pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Role[]>> {
    const defaultSort: Sort<Role> = new Sort<Role>('name');

    const query = new PaginatedQuery<Role>();
    query.defaultSort = [defaultSort];
    query.pagination = pagination;

    return this.userApi.readAvailableRoles(userId, query);
  }

  public create(data: User): Observable<User> {
    return this.userApi.create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: User): Observable<User> {
    return this.userApi.updateById(id, data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.userApi.deleteById(id).pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<User> {
    return this.userApi.readById(id).pipe(map(r => r.content));
  }

  public addRole(id: number, role: number): Observable<Role> {
    return this.userApi.updateRoles(id, role).pipe(map(r => r.content));
  }

  public removeRole(id: number, role: number): Observable<boolean> {
    return this.userApi.removeRoles(id, role).pipe(map(r => r.content));
  }

}
