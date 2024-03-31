import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortDirection } from '@app/core/api/models/sort-direction';
import { SortField } from '@app/core/api/models/sort-field';
import { ResourcePermission } from '@app/core/authentication/models/resource-permission';
import { Role } from '@app/core/authentication/models/role';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class AccessRoleService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(page: number, sort: Sort): Observable<PaginatedResponse<Role[]>> {
    const defaultSort = new SortField('name');
    defaultSort.direction = SortDirection.Ascending;

    const query = new PaginatedQuery();
    query.defaultSort = new Sort([defaultSort]);
    query.pagination = { page };
    query.sort = sort;

    return this.getClient()
      .query(query)
      .read<PaginatedResponse<Role[]>>();
  }

  public getAvailablePermissions(role: string, page: number, sort: Sort): Observable<PaginatedResponse<ResourcePermission[]>> {
    const sortResource: SortField = new SortField('resource');
    const sortAction: SortField = new SortField('action');

    const query = new PaginatedQuery();
    query.defaultSort = new Sort([sortResource, sortAction]);
    query.pagination = { page };
    query.sort = sort;

    return this.getClient()
      .query(query)
      .appendRoute(`/${role}/permission/available`)
      .read<PaginatedResponse<ResourcePermission[]>>();
  }

  public create(data: Role): Observable<Role> {
    return this.getClient()
      .create<SimpleResponse<Role>>(data)
      .pipe(map(r => r.content));
  }

  public update(role: string, data: Role): Observable<Role> {
    return this.getClient()
      .appendRoute(`/${role}`)
      .update<SimpleResponse<Role>>(data)
      .pipe(map(r => r.content));
  }

  public delete(role: string): Observable<boolean> {
    return this.getClient()
      .appendRoute(`/${role}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getOne(role: string): Observable<Role> {
    return this.getClient()
      .appendRoute(`/${role}`)
      .read<SimpleResponse<Role>>()
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/security/role');
  }

}
