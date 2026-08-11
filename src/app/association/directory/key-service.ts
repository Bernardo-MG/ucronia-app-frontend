import { Injectable, inject } from '@angular/core';
import { KeyCreation, KeyUpdate, UcroniaClient } from '@ucronia/api';
import { Key } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyService {

  private readonly ucroniaClient = inject(UcroniaClient);

  private readonly messageService = inject(MessageService);

  public getAll(): Observable<Key[]> {
    return this.ucroniaClient.key.getAll();
  }

  public create(data: Key): Observable<Key> {
    const create: KeyCreation = {
      number: data.number,
      missing: data.missing,
      description: data.description
    };

    return this.ucroniaClient.key.create(create)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Creado',
            detail: 'Llave creada',
            life: 3000
          });
        })
      );
  }

  public update(data: Key): Observable<Key> {
    const update: KeyUpdate = {
      missing: data.missing,
      description: data.description
    };

    return this.ucroniaClient.key.update(data.number, update)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Actualizado',
            detail: 'Llave actualizada',
            life: 3000
          });
        })
      );
  }

  public delete(number: number): Observable<Key> {
    return this.ucroniaClient.key.delete(number)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Borrado',
            detail: 'Llave borrada',
            life: 3000
          });
        }),
        catchError(error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo borrar la llave',
            life: 5000
          });
          return throwError(() => error);
        })
      );
  }

}
