import { inject, Injectable } from '@angular/core';
import { ResourcePermission, Role } from '@bernardo-mg/authentication';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { SecurityClient } from '@bernardo-mg/security';
import { mergeProperties } from '@ucronia/api';
import { MessageService } from 'primeng/api';
import { catchError, combineLatest, expand, map, Observable, of, reduce, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class RoleService {

  private readonly securityClient = inject(SecurityClient);
  private readonly messageService = inject(MessageService);

  public getAll(page: number | undefined = undefined, sort: Sorting): Observable<Page<Role>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [
          new SortingProperty('name')
        ]
      )
    );

    return this.securityClient.role.page(page, undefined, sorting);
  }

  public getAvailablePermissions(role: string): Observable<ResourcePermission[]> {
    return combineLatest([
      this.getOne(role),
      this.getAllPermissions()
    ]).pipe(
      map(([role, permissions]) => {
        const rolePermissions = role.permissions?.map(p => `${p.resource}:${p.action}`) ?? [];
        return permissions.filter(permission => !rolePermissions.includes(`${permission.resource}:${permission.action}`));
      })
    );
  }

  public getAllPermissions(): Observable<ResourcePermission[]> {
    const sorting = new Sorting(
      [new SortingProperty('resource'), new SortingProperty('action')]
    );
    const pageSize = 100;

    return this.securityClient.permission.page(undefined, pageSize, sorting)
      .pipe(
        expand(response => {
          if (!response.last) {
            const nextPage = response.page + 1;
            return this.securityClient.permission.page(nextPage, pageSize, sorting);
          }
          return of();
        }),
        // accumulate roles from all pages into one array
        reduce((permissions: ResourcePermission[], res?: Page<ResourcePermission>) => {
          return res ? [...permissions, ...res.content] : permissions;
        }, [])
      );
  }

  public create(role: Role): Observable<Role> {
    return this.securityClient.role.create(role)
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

  public update(data: Role): Observable<Role> {
    return this.securityClient.role.update(data.name, data)
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

  public delete(role: string): Observable<Role> {
    return this.securityClient.role.delete(role)
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

  public getOne(role: string): Observable<Role> {
    return this.securityClient.role.get(role);
  }

}
