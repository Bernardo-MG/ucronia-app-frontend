import { inject, Injectable } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { Transaction } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { Page } from 'projects/bernardo-mg/request/src/lib/models/page';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TransactionService {

  private readonly ucroniaClient = inject(UcroniaClient);
  private readonly messageService = inject(MessageService);

  public create(data: Transaction): Observable<Transaction> {
    return this.ucroniaClient.transaction.create(data)
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

  public update(data: Transaction): Observable<Transaction> {
    return this.ucroniaClient.transaction.update(data.index, data)
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

  public delete(index: number): Observable<Transaction> {
    return this.ucroniaClient.transaction.delete(index)
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

  public getAll(page: number | undefined = undefined, description: string | undefined = undefined): Observable<Page<Transaction>> {
    return this.ucroniaClient.transaction
      .page(page, undefined, undefined, description, undefined, undefined);
  }

  public getOne(index: number): Observable<Transaction> {
    return this.ucroniaClient.transaction.get(index);
  }

}
