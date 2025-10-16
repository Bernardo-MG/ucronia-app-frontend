import { inject, Injectable } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { Role, User } from '@bernardo-mg/authentication';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { UserChange } from './models/user-change';

@Injectable({
  providedIn: "root"
})
export class AccessUserService {

  private readonly inviteClient;

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/security/user');
    this.inviteClient = clientProvider.url(environment.apiUrl + '/security/user/onboarding/invite');
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<User>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('name')]
    );

    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  public invite(data: User): Observable<User> {
    return this.inviteClient
      .create<SimpleResponse<User>>(data)
      .pipe(map(r => r.content));
  }

  public update(data: UserChange): Observable<User> {
    return this.client
      .appendRoute(`/${data.username}`)
      .update<SimpleResponse<User>>(data)
      .pipe(map(r => r.content));
  }

  public delete(username: string): Observable<User> {
    return this.client
      .appendRoute(`/${username}`)
      .delete<SimpleResponse<User>>()
      .pipe(map(r => r.content));
  }

  public getOne(username: string): Observable<User> {
    return this.client
      .appendRoute(`/${username}`)
      .read<SimpleResponse<User>>()
      .pipe(map(r => r.content));
  }

  // ROLES

  public getAvailableRoles(username: string, page: number): Observable<PaginatedResponse<Role>> {
    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortingProperty('name')]))
      .appendRoute(`/${username}/role/available`)
      .read<PaginatedResponse<Role>>();
  }

  // Members

  public getMember(username: string): Observable<Member> {
    return this.client
      .appendRoute(`/${username}/person`)
      .read<SimpleResponse<Member>>()
      .pipe(map(r => r.content));
  }

  public assignMember(username: string, member: Member): Observable<Member> {
    return this.client
      .appendRoute(`/${username}/person/${member.number}`)
      .create<SimpleResponse<Member>>(null)
      .pipe(map(r => r.content));
  }

  public getAvailableMembers(username: string, page: number): Observable<PaginatedResponse<Member>> {
    return this.client
      .appendRoute(`/${username}/person/available`)
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]))
      .read<PaginatedResponse<Member>>();
  }

}
