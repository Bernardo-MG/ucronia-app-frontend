import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { SortDirection } from '@app/core/api/models/sort-direction';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
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

  public getAll(page: number, sort: Sort): Observable<PaginatedResponse<User[]>> {
    const defaultSort = new SortField('name');
    defaultSort.direction = SortDirection.Ascending;

    const query = new PaginatedQuery();
    query.defaultSort = new Sort([defaultSort]);
    query.pagination = { page };
    query.sort = sort;

    return this.getRequest().query(query).read();
  }

  public getRoles(username: string, page: number, sort: Sort): Observable<PaginatedResponse<Role[]>> {
    const defaultSort: SortField = new SortField('name');

    const query = new PaginatedQuery();
    query.defaultSort = new Sort([defaultSort]);
    query.pagination = { page };
    query.sort = sort;

    return this.getRequest().query(query).appendRoute(`/${username}/role`).read();
  }

  public getAvailableRoles(username: string, page: number): Observable<PaginatedResponse<Role[]>> {
    const defaultSort: SortField = new SortField('name');

    const query = new PaginatedQuery();
    query.defaultSort = new Sort([defaultSort]);
    query.pagination = { page };

    return this.getRequest().query(query).appendRoute(`/${username}/role/available`).read();
  }

  public create(data: User): Observable<User> {
    return this.getRequest().create<SimpleResponse<User>>(data).pipe(map(r => r.content));
  }

  public update(username: string, data: User): Observable<User> {
    return this.getRequest().appendRoute(`/${username}`).update<SimpleResponse<User>>(data).pipe(map(r => r.content));
  }

  public delete(username: string): Observable<boolean> {
    return this.getRequest().appendRoute(`/${username}`).delete<SimpleResponse<boolean>>().pipe(map(r => r.content));
  }

  public getOne(username: string): Observable<User> {
    return this.getRequest().appendRoute(`/${username}`).read<SimpleResponse<User>>().pipe(map(r => r.content));
  }

  public addRole(username: string, role: string): Observable<Role> {
    return this.getRequest().appendRoute(`/${username}/role/${role}`).update<SimpleResponse<Role>>({}).pipe(map(r => r.content));
  }

  public removeRole(username: string, role: string): Observable<boolean> {
    return this.getRequest().appendRoute(`/${username}/role/${role}`).delete<SimpleResponse<boolean>>().pipe(map(r => r.content));
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/security/user');
  }

}
