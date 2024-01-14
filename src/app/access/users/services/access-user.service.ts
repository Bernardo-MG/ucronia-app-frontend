import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(
    private http: HttpClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<User[]>> {
    const defaultSort = new Sort('name');
    defaultSort.direction = Direction.Ascending;

    const query = new PaginatedQuery<User>();
    query.defaultSort = [defaultSort];
    query.pagination = pagination;

    return this.userApi.readAll(query);
  }

  public getRoles(username: string, pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Role[]>> {
    const defaultSort: Sort = new Sort('name');

    const query = new PaginatedQuery<Role>();
    query.defaultSort = [defaultSort];
    query.pagination = pagination;

    return this.userApi.readRoles(username, query);
  }

  public getAvailableRoles(username: string, pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Role[]>> {
    const defaultSort: Sort = new Sort('name');

    const query = new PaginatedQuery<Role>();
    query.defaultSort = [defaultSort];
    query.pagination = pagination;

    return this.userApi.readAvailableRoles(username, query);
  }

  public create(data: User): Observable<User> {
    return this.userApi.create(data).pipe(map(r => r.content));
  }

  public update(username: string, data: User): Observable<User> {
    return this.userApi.updateById(username, data).pipe(map(r => r.content));
  }

  public delete(username: string): Observable<boolean> {
    return this.userApi.deleteById(username).pipe(map(r => r.content));
  }

  public getOne(username: string): Observable<User> {
    return this.userApi.readById(username).pipe(map(r => r.content));
  }

  public addRole(username: string, role: string): Observable<Role> {
    return this.userApi.updateRoles(username, role).pipe(map(r => r.content));
  }

  public removeRole(username: string, role: string): Observable<boolean> {
    return this.userApi.removeRoles(username, role).pipe(map(r => r.content));
  }

}
