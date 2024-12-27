import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationParams } from '@app/core/api/models/pagination-params';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { SortingParams } from '@app/core/api/models/sorting-params';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { Member } from '@app/models/members/member';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { UserUpdate } from '../models/user-update';

@Injectable({
  providedIn: "root"
})
export class AccessUserService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(page: number, sort: Sort): Observable<PaginatedResponse<User[]>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortProperty('name')]
    );

    return this.getClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
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

  // ROLES

  public getAvailableRoles(username: string, page: number): Observable<PaginatedResponse<Role[]>> {
    return this.getClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortProperty('name')]))
      .appendRoute(`/${username}/role/available`)
      .read<PaginatedResponse<Role[]>>();
  }

  // Members

  public getMember(username: string): Observable<Member> {
    return this.getClient()
      .appendRoute(`/${username}/person`)
      .read<SimpleResponse<Member>>()
      .pipe(map(r => r.content));
  }

  public assignMember(username: string, member: Member): Observable<Member> {
    return this.getClient()
      .appendRoute(`/${username}/person/${member.number}`)
      .create<SimpleResponse<Member>>(null)
      .pipe(map(r => r.content));
  }

  public getAvailableMembers(username: string, page: number): Observable<PaginatedResponse<Member[]>> {
    return this.getClient()
      .appendRoute(`/${username}/person/available`)
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortProperty('firstName'), new SortProperty('lastName'), new SortProperty('number')]))
      .read<PaginatedResponse<Member[]>>();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/security/user');
  }

}
