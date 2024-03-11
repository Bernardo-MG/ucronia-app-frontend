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
import { Permission } from '@app/core/authentication/models/permission';
import { Role } from '@app/core/authentication/models/role';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class AccessRoleService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Role[]>> {
    const defaultSort = new Sort('name');
    defaultSort.direction = Direction.Ascending;

    const query = new PaginatedQuery<Role>();
    query.defaultSort = [defaultSort];
    query.pagination = pagination;

    return this.getRequest().query(query).read();
  }

  public getPermissions(role: string, pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Permission[]>> {
    const sortResource: Sort = new Sort('resource');
    const sortAction: Sort = new Sort('action');

    const query = new PaginatedQuery<Permission>();
    query.defaultSort = [sortResource, sortAction];
    query.pagination = pagination;

    return this.getRequest().query(query).appendRoute(`/${role}/permission`).read();
  }

  public getAvailablePermissions(role: string, pagination: PaginationRequest | undefined): Observable<PaginatedResponse<Permission[]>> {
    const sortResource: Sort = new Sort('resource');
    const sortAction: Sort = new Sort('action');

    const query = new PaginatedQuery<Permission>();
    query.defaultSort = [sortResource, sortAction];
    query.pagination = pagination;

    return this.getRequest().query(query).appendRoute(`/${role}/permission/available`).read();
  }

  public create(data: Role): Observable<Role> {
    return this.getRequest().create<ApiResponse<Role>>(data).pipe(map(r => r.content));
  }

  public update(role: string, data: Role): Observable<Role> {
    return this.getRequest().appendRoute(`/${role}`).update<ApiResponse<Role>>(data).pipe(map(r => r.content));
  }

  public delete(role: string): Observable<boolean> {
    return this.getRequest().appendRoute(`/${role}`).delete<ApiResponse<boolean>>().pipe(map(r => r.content));
  }

  public getOne(role: string): Observable<Role> {
    return this.getRequest().appendRoute(`/${role}`).read<ApiResponse<Role>>().pipe(map(r => r.content));
  }

  public addPermission(role: string, permission: string): Observable<Permission> {
    return this.getRequest().appendRoute(`/${role}/permission/${permission}`).update<ApiResponse<Permission>>({}).pipe(map(r => r.content));
  }

  public removePermission(role: string, permission: string): Observable<boolean> {
    return this.getRequest().appendRoute(`/${role}/permission/${permission}`).delete<ApiResponse<boolean>>().pipe(map(r => r.content));
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/security/role');
  }

}
