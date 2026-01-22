import { inject, Injectable } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { PaginatedResponse } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { FeeType } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeeTypeService {

  private readonly ucroniaClient = inject(UcroniaClient);

  private readonly messageService = inject(MessageService);

  public getAll(page: number | undefined = undefined): Observable<PaginatedResponse<FeeType>> {
    return this.ucroniaClient.feeType.page(page)
  }

  public getAllAvailable(): Observable<FeeType[]> {
    return getAllPages(this.ucroniaClient.feeType.page);
  }

  public create(data: FeeType): Observable<FeeType> {
    return this.ucroniaClient.feeType.create(data)
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

  public update(data: FeeType): Observable<FeeType> {
    return this.ucroniaClient.feeType.update(data)
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

  public delete(number: number): Observable<FeeType> {
    return this.ucroniaClient.feeType.delete(number)
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
