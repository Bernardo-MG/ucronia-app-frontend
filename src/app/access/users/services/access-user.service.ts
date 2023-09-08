import { Injectable } from '@angular/core';
import { AccessApiClient } from '@app/core/api/client/access-api-client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { map, Observable } from 'rxjs';

@Injectable()
export class AccessUserService {

  constructor(
    private client: AccessApiClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<User[]>> {
    const defaultSort = new Sort<User>('name');
    defaultSort.order = 'asc';

    const query = new PaginatedQuery<User>();
    query.defaultSort = [defaultSort];
    query.pagination = pagination;

    return this.client.user().readAll(query);
  }

  public getRoles(userId: number, page: number): Observable<PaginatedResponse<Role[]>> {
    const sort: Sort<Role> = new Sort<Role>('name');

    const query = new PaginatedQuery<Role>();
    query.sort = [sort];
    query.page = page;

    return this.client.userRoles(userId).readAll(query);
  }

  public getRoleSelection(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Role[]>> {
    const query = new PaginatedQuery<Role>();
    query.pagination = pagination;

    return this.client.role().readAll(query);
  }

  public create(data: User): Observable<User> {
    return this.client.user().create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: User): Observable<User> {
    return this.client.user().updateById(id, data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.client.user().deleteById(id).pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<User> {
    return this.client.user().readById(id).pipe(map(r => r.content));
  }

  public addRole(id: number, role: number): Observable<boolean> {
    return this.client.userRoles(id).update({ id: role }).pipe(map(r => r.content));
  }

  public removeRole(id: number, role: number): Observable<boolean> {
    return this.client.userRoles(id).delete(role).pipe(map(r => r.content));
  }

}
