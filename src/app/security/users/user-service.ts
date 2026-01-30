import { inject, Injectable } from '@angular/core';
import { Role, User } from '@bernardo-mg/authentication';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { SecurityClient, UserCreation, UserUpdate } from '@bernardo-mg/security';
import { mergeProperties, UcroniaClient } from '@ucronia/api';
import { MemberProfile, MemberStatus, Profile } from "@ucronia/domain";
import { combineLatest, expand, map, Observable, of, reduce } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UserService {

  private readonly securityClient = inject(SecurityClient);

  private readonly ucroniaClient = inject(UcroniaClient);

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
    return this.securityClient.user.onboarding.invite(data);
  }

  public update(username: string, data: UserUpdate): Observable<User> {
    return this.securityClient.user.update(username, data);
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

  public getAvailableMembers(username: string): Observable<MemberProfile[]> {
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

  private getAllMembers(): Observable<MemberProfile[]> {
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
        reduce((members: MemberProfile[], res?: PaginatedResponse<MemberProfile>) => {
          return res ? [...members, ...res.content] : members;
        }, [])
      );
  }

}
