import { Injectable } from '@angular/core';
import { AccessApiClient } from '@app/core/api/client/access-api-client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
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

    return this.client.user().page(pagination).defaultSort([defaultSort]).readAll();
  }

  public getRoles(userId: number, page: number): Observable<PaginatedResponse<Role[]>> {
    const sort: Sort<Role> = new Sort<Role>('name');
    return this.client.userRoles(userId).page({ page }).sort([sort]).readAll();
  }

  public getRoleSelection(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Role[]>> {
    return this.client.role().page(pagination).readAll();
  }

  public create(data: User): Observable<User> {
    return this.client.user().create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: User): Observable<User> {
    return this.client.user().id(id).update(data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.client.user().id(id).delete().pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<User> {
    return this.client.user().id(id).readOne().pipe(map(r => r.content));
  }

  public addRole(id: number, role: number): Observable<boolean> {
    return this.client.userRoles(id).update({ id: role }).pipe(map(r => r.content));
  }

  public removeRole(id: number, role: number): Observable<boolean> {
    return this.client.userRoles(id).delete(role).pipe(map(r => r.content));
  }

}
