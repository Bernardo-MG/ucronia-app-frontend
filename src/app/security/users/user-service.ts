import { inject, Injectable } from '@angular/core';
import { Role, User } from '@bernardo-mg/authentication';
import { AngularCrudClientProvider, PaginatedResponse, SimpleResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { SecurityClient } from '@bernardo-mg/security';
import { mergeProperties, UcroniaClient } from '@ucronia/api';
import { Member, MemberStatus, Profile } from "@ucronia/domain";
import { environment } from 'environments/environment';
import { combineLatest, expand, map, Observable, of, reduce } from 'rxjs';
import { UserChange } from './models/user-change';
import { UserCreation } from './models/user-creation';

@Injectable({
  providedIn: "root"
})
export class UserService {

  private readonly securityClient = inject(SecurityClient);

  private readonly ucroniaClient = inject(UcroniaClient);

  private readonly inviteClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.inviteClient = clientProvider.url(environment.apiUrl + '/security/user/onboarding/invite');
  }

  public getAll(page: number | undefined = undefined, sort: Sorting): Observable<PaginatedResponse<User>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [
          new SortingProperty('name')
        ]
      )
    );

    return this.securityClient.user.page(page, undefined, sorting);
  }

  public invite(data: UserCreation): Observable<User> {
    return this.inviteClient
      .create<SimpleResponse<User>>(data)
      .pipe(map(r => r.content));
  }

  public update(data: UserChange): Observable<User> {
    return this.securityClient.user.update(data.username, data);
  }

  public delete(username: string): Observable<User> {
    return this.securityClient.user.delete(username);
  }

  public getOne(username: string): Observable<User> {
    return this.securityClient.user.get(username);
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
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );
    const pageSize = 100;

    return this.securityClient.role.page(undefined, pageSize, sorting)
      .pipe(
        expand(response => {
          if (!response.last) {
            const nextPage = response.page + 1;
            return this.securityClient.role.page(nextPage, pageSize, sorting);
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

  public getProfile(username: string): Observable<Profile> {
    return this.securityClient.user.profile.get(username);
  }

  public assignProfile(username: string, profile: number): Observable<Profile> {
    return this.securityClient.user.profile.set(username, profile);
  }

  public getAvailableMembers(username: string): Observable<Member[]> {
    return combineLatest([
      this.getProfile(username),
      this.getAllMembers()
    ]).pipe(
      map(([member, members]) => {
        if (!member) {
          return members;
        }
        return members.filter(m => m.number !== member.number);
      })
    );
  }

  private getAllMembers(): Observable<Member[]> {
    const sorting = new Sorting(
      [new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]
    );
    const pageSize = 100;

    return this.ucroniaClient.memberProfile.page(undefined, pageSize, sorting, MemberStatus.All)
      .pipe(
        expand(response => {
          if (!response.last) {
            const nextPage = response.page + 1;
            return this.ucroniaClient.memberProfile.page(nextPage, pageSize, sorting, MemberStatus.All);
          }
          return of();
        }),
        // accumulate members from all pages into one array
        reduce((members: Member[], res?: PaginatedResponse<Member>) => {
          return res ? [...members, ...res.content] : members;
        }, [])
      );
  }

}
