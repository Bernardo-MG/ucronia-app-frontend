import { inject, Injectable } from '@angular/core';
import { PublicMember } from '@app/domain/members/public-member';
import { Role, User } from '@bernardo-mg/authentication';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { combineLatest, expand, map, Observable, of, reduce } from 'rxjs';
import { UserChange } from './models/user-change';
import { UserCreation } from './models/user-creation';

@Injectable({
  providedIn: "root"
})
export class AccessUserService {

  private readonly inviteClient;

  private readonly client;

  private readonly rolesClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/security/user');
    this.inviteClient = clientProvider.url(environment.apiUrl + '/security/user/onboarding/invite');
    this.rolesClient = clientProvider.url(environment.apiUrl + '/security/role');
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

  public invite(data: UserCreation): Observable<User> {
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

  public getAvailableRoles(username: string): Observable<Role[]> {
    return combineLatest([
      this.getOne(username),
      this.getAllRoles()
    ]).pipe(
      map(([user, roles]) => {
        const userRoles = user.roles?.map(r => r.name) ?? [];
        return roles.filter(role => !userRoles.includes(role.name));
      })
    );
  }

  public getAllRoles(): Observable<Role[]> {
    const sorting = new SortingParams(
      [new SortingProperty('name')]
    );
    const pageSize = 100;

    return this.rolesClient
      .loadParameters(new PaginationParams(1, pageSize))
      .loadParameters(sorting)
      .read<PaginatedResponse<Role>>()
      .pipe(
        expand(response => {
          if (!response.last) {
            const nextPage = response.page + 1;
            return this.rolesClient
              .loadParameters(new PaginationParams(nextPage, pageSize))
              .loadParameters(sorting)
              .read<PaginatedResponse<Role>>();
          }
          return of();
        }),
        // accumulate roles from all pages into one array
        reduce((roles: Role[], res?: PaginatedResponse<Role>) => {
          return res ? [...roles, ...res.content] : roles;
        }, [])
      );
  }

  // Members

  public getMember(username: string): Observable<PublicMember> {
    return this.client
      .appendRoute(`/${username}/contact`)
      .read<SimpleResponse<PublicMember>>()
      .pipe(map(r => r.content));
  }

  public assignMember(username: string, member: PublicMember): Observable<PublicMember> {
    return this.client
      .appendRoute(`/${username}/contact/${member.number}`)
      .create<SimpleResponse<PublicMember>>(null)
      .pipe(map(r => r.content));
  }

  public getAvailableMembers(username: string, page: number): Observable<PaginatedResponse<PublicMember>> {
    return this.client
      .appendRoute(`/${username}/contact/available`)
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]))
      .read<PaginatedResponse<PublicMember>>();
  }

}
