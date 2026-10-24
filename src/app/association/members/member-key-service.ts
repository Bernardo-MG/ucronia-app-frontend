import { inject, Injectable } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { Sorting, SortingProperty } from '@bernardo-mg/request';
import { KeyCreation, KeyUpdate, UcroniaClient } from '@ucronia/api';
import { Key, KeyAssignment } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MemberKeyService {

  private readonly ucroniaClient = inject(UcroniaClient);

  private readonly messageService = inject(MessageService);

  public create(data: Key): Observable<Key> {
    const create: KeyCreation = {
      available: data.available,
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
      available: data.available,
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

  public assign(number: number, profile: number): Observable<KeyAssignment> {
    return this.ucroniaClient.keyAssignment.create({ number, profile })
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Asignado',
            detail: 'Llave asignada',
            life: 3000
          });
        })
      );
  }

  public getAll(): Observable<KeyAssignment[]> {
    const sorting = new Sorting([new SortingProperty('number')]);
    return getAllPages((page, size) => this.ucroniaClient.keyAssignment.page(page, size, sorting));
  }

}
