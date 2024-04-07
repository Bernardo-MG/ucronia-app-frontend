import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortDirection } from '@app/core/api/models/sort-direction';
import { SortField } from '@app/core/api/models/sort-field';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { UserUpdate } from '../models/user-update';
import { Member } from '@app/association/members/models/member';

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

    return this.getClient()
      .query(query)
      .read();
  }

  public getAvailableRoles(username: string, page: number): Observable<PaginatedResponse<Role[]>> {
    const defaultSort: SortField = new SortField('name');

    const query = new PaginatedQuery();
    query.defaultSort = new Sort([defaultSort]);
    query.pagination = { page };

    return this.getClient()
      .query(query)
      .appendRoute(`/${username}/role/available`)
      .read<PaginatedResponse<Role[]>>();
  }

  public getAvailableMembers(page: number): Observable<PaginatedResponse<Member[]>> {
    const defaultSort: SortField = new SortField('name');

    const query = new PaginatedQuery();
    query.defaultSort = new Sort([defaultSort]);
    query.pagination = { page };

    return this.getMembersClient()
      .query(query)
      .read<PaginatedResponse<Member[]>>();
  }

  public create(data: User): Observable<User> {
    return this.getClient()
      .create<SimpleResponse<User>>(data)
      .pipe(map(r => r.content));
  }

  public update(username: string, data: UserUpdate): Observable<User> {
    return this.getClient()
      .appendRoute(`/${username}`)
      .update<SimpleResponse<User>>(data)
      .pipe(map(r => r.content));
  }

  public delete(username: string): Observable<boolean> {
    return this.getClient()
      .appendRoute(`/${username}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getOne(username: string): Observable<User> {
    return this.getClient()
      .appendRoute(`/${username}`)
      .read<SimpleResponse<User>>()
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/security/user');
  }

  private getMembersClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/member');
  }

}
