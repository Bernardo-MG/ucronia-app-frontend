import { inject, Injectable } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { Role, User } from '@bernardo-mg/authentication';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { SecurityClient, UserCreation, UserUpdate } from '@bernardo-mg/security';
import { mergeProperties, UcroniaClient } from '@ucronia/api';
import { Member, MemberStatus, Profile } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

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

  // TODO: Add backend role name search before enabling the role search control.
  public getAllRoles(): Observable<Role[]> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    const endpoint = this.securityClient.role;

    return getAllPages((page, size) => endpoint.page(page, size, sorting));
  }

  // Members

  public getProfile(username: string): Observable<Profile> {
    return this.ucroniaClient.user.profile.get(username);
  }

  public assignProfile(username: string, profile: number): Observable<Profile> {
    let obs: Observable<Profile>;
    if (profile && profile > 0) {
      obs = this.ucroniaClient.user.profile.set(username, profile);
    } else {
      obs = this.ucroniaClient.user.profile.delete(username);
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

}
