import { inject, Injectable } from '@angular/core';
import { CrudService } from '@app/shared/data/services/crud-service';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { mergeProperties, UcroniaClient } from '@ucronia/api';
import { GameSystem } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class GameSystemCrudService implements CrudService<GameSystem> {

  private readonly ucroniaClient = inject(UcroniaClient);
  private readonly messageService = inject(MessageService);

  public create(data: GameSystem): Observable<GameSystem> {
    return this.ucroniaClient.library.gameSystem.create(data)
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

  public update(data: GameSystem): Observable<GameSystem> {
    return this.ucroniaClient.library.gameSystem.update(data.number, data)
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

  public getOne(number: number): Observable<GameSystem> {
    return this.ucroniaClient.library.gameSystem.get(number);
  }

  public delete(number: number): Observable<GameSystem> {
    return this.ucroniaClient.library.gameSystem.delete(number)
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

  public getAll(page: number | undefined, sort: Sorting): Observable<Page<GameSystem>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [new SortingProperty('name'), new SortingProperty('number')]
      )
    );

    return this.ucroniaClient.library.gameSystem.page(page, undefined, sorting);
  }

}
