import { inject, Injectable } from '@angular/core';
import { ResourcePermission, Role } from '@bernardo-mg/authentication';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { SecurityClient } from '@bernardo-mg/security';
import { mergeProperties } from '@ucronia/api';
import { MessageService } from 'primeng/api';
import { catchError, EMPTY, expand, Observable, reduce, tap, throwError } from 'rxjs';

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

  // TODO: Add backend permission search/eligibility support before enabling search.
  public getAllPermissions(): Observable<ResourcePermission[]> {
    const sorting = new Sorting(
      [new SortingProperty('resource'), new SortingProperty('action')]
    );
    const pageSize = 100;

    const endpoint = this.securityClient.permission;

    return endpoint.page(undefined, pageSize, sorting).pipe(
      expand(page => page.last ? EMPTY : endpoint.page(page.page + 1, pageSize, sorting)),
      reduce((items, page) => items.concat(page.content), [] as ResourcePermission[])
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
