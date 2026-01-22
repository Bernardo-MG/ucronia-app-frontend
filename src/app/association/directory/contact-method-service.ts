import { inject, Injectable } from '@angular/core';
import { PaginatedResponse } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { ContactMethod } from "@ucronia/domain";
import { MessageService } from 'primeng/api';
import { catchError, expand, Observable, of, reduce, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactMethodService {

  private readonly ucroniaClient = inject(UcroniaClient);

  private readonly messageService = inject(MessageService);

  public getAll(page: number | undefined = undefined): Observable<PaginatedResponse<ContactMethod>> {
    return this.ucroniaClient.contactMethod.page(page);
  }

  public getAllAvailable(): Observable<ContactMethod[]> {
    const pageSize = 100;

    return this.ucroniaClient.contactMethod.page(0, pageSize)
      .pipe(
        expand(response => {
          if (!response.last) {
            const nextPage = response.page + 1;
            return this.ucroniaClient.contactMethod.page(nextPage, pageSize);
          }
          return of();
        }),
        // accumulate from all pages into one array
        reduce((methods: ContactMethod[], res?: PaginatedResponse<ContactMethod>) => {
          return res ? [...methods, ...res.content] : methods;
        }, [])
      );
  }

  public create(data: ContactMethod): Observable<ContactMethod> {
    return this.ucroniaClient.contactMethod.create(data)
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

  public update(data: ContactMethod): Observable<ContactMethod> {
    return this.ucroniaClient.contactMethod.update(data)
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

  public delete(number: number): Observable<ContactMethod> {
    return this.ucroniaClient.contactMethod.delete(number)
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

}
