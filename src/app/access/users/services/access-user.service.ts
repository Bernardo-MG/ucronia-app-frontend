import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { Direction } from '@app/core/api/models/direction';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { AngularRequest } from '@app/core/api/request/angular-request';
import { Request } from '@app/core/api/request/request';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class AccessUserService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<User[]>> {
    const defaultSort = new Sort('name');
    defaultSort.direction = Direction.Ascending;

    const query = new PaginatedQuery<User>();
    query.defaultSort = [defaultSort];
    query.pagination = pagination;

    return this.getRequest().query(query).read();
  }

  public getRoles(username: string, pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Role[]>> {
    const defaultSort: Sort = new Sort('name');

    const query = new PaginatedQuery<Role>();
    query.defaultSort = [defaultSort];
    query.pagination = pagination;

    return this.getRequest().query(query).appendRoute(`/${username}/role`).read();
  }

  public getAvailableRoles(username: string, pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Role[]>> {
    const defaultSort: Sort = new Sort('name');

    const query = new PaginatedQuery<Role>();
    query.defaultSort = [defaultSort];
    query.pagination = pagination;

    return this.getRequest().query(query).appendRoute(`/${username}/role/available`).read();
  }

  public create(data: User): Observable<User> {
    return this.getRequest().create<ApiResponse<User>>(data).pipe(map(r => r.content));
  }

  public update(username: string, data: User): Observable<User> {
    return this.getRequest().appendRoute(`/${username}`).update<ApiResponse<User>>(data).pipe(map(r => r.content));
  }

  public delete(username: string): Observable<boolean> {
    return this.getRequest().appendRoute(`/${username}`).delete<ApiResponse<boolean>>().pipe(map(r => r.content));
  }

  public getOne(username: string): Observable<User> {
    return this.getRequest().appendRoute(`/${username}`).read<ApiResponse<User>>().pipe(map(r => r.content));
  }

  public addRole(username: string, role: string): Observable<Role> {
    return this.getRequest().appendRoute(`/${username}/role/${role}`).update<ApiResponse<Role>>({}).pipe(map(r => r.content));
  }

  public removeRole(username: string, role: string): Observable<boolean> {
    return this.getRequest().appendRoute(`/${username}/role/${role}`).delete<ApiResponse<boolean>>().pipe(map(r => r.content));
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/security/user');
  }

}
