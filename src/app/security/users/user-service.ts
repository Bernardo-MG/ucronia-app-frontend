import { inject, Injectable } from '@angular/core';
import { Role, User } from '@bernardo-mg/authentication';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { SecurityClient, UserCreation, UserUpdate } from '@bernardo-mg/security';
import { mergeProperties, UcroniaClient } from '@ucronia/api';
import { Member, MemberStatus, Profile } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { catchError, combineLatest, expand, map, Observable, of, reduce, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UserService {

  private readonly securityClient = inject(SecurityClient);
  private readonly ucroniaClient = inject(UcroniaClient);
  private readonly messageService = inject(MessageService);

  public getAll(page: number | undefined = undefined, sort: Sorting): Observable<Page<User>> {
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
    return this.securityClient.user.onboarding.invite(data)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Creado',
            detail: 'Datos creados',
            life: 3000
          });
        })
      );
  }

  public update(username: string, data: UserUpdate): Observable<User> {
    return this.securityClient.user.update(username, data)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Actualizado',
            detail: 'Datos actualizados',
            life: 3000
          });
        })
      );
  }

  public delete(username: string): Observable<User> {
    return this.securityClient.user.delete(username)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Borrado',
            detail: 'Datos borrados',
            life: 3000
          });
        }),
        catchError(error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo borrar el registro',
            life: 5000
          });
          return throwError(() => error);
        })
      );
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
        reduce((roles: Role[], res?: Page<Role>) => {
          return res ? [...roles, ...res.content] : roles;
        }, [])
      );
  }

  // Members

  public getProfile(username: string): Observable<Profile> {
    return this.securityClient.user.profile.get(username);
  }

  public assignProfile(username: string, profile: number): Observable<Profile> {
    let obs: Observable<Profile>;
    if (profile && profile > 0) {
      obs = this.securityClient.user.profile.set(username, profile);
    } else {
      obs = this.securityClient.user.profile.delete(username);
    }

    return obs
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Actualizado',
            detail: 'Datos actualizados',
            life: 3000
          });
        })
      );
  }

  public searchMembers(query: string, active: MemberStatus = MemberStatus.Active): Observable<Member[]> {
    const sorting = new Sorting(
      [
        new SortingProperty('name.firstName'),
        new SortingProperty('name.lastName'),
        new SortingProperty('number')
      ]
    );

    return this.ucroniaClient.memberProfile.page(undefined, 10, sorting, active, query)
      .pipe(map(page => page.content as Member[]));
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
      [
        new SortingProperty('name.firstName'),
        new SortingProperty('name.lastName'),
        new SortingProperty('number')
      ]
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
        reduce((members: Member[], res?: Page<Member>) => {
          return res ? [...members, ...res.content] : members;
        }, [])
      );
  }

}
