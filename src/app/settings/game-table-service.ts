import { inject, Injectable } from '@angular/core';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { GameTable } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameTableService {

  private readonly ucroniaClient = inject(UcroniaClient);
  private readonly messageService = inject(MessageService);

  public getAll(page: number | undefined = undefined): Observable<Page<GameTable>> {
    return this.ucroniaClient.gameTable.page(page, undefined, new Sorting([new SortingProperty('name')]));
  }

  public create(data: GameTable): Observable<GameTable> {
    return this.ucroniaClient.gameTable.create(data).pipe(tap(() => this.notify('Creado', 'Datos creados')));
  }

  public update(data: GameTable): Observable<GameTable> {
    return this.ucroniaClient.gameTable.update(data.number, data)
      .pipe(tap(() => this.notify('Actualizado', 'Datos actualizados')));
  }

  public delete(number: number): Observable<GameTable> {
    return this.ucroniaClient.gameTable.delete(number).pipe(
      tap(() => this.notify('Borrado', 'Datos borrados')),
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

  private notify(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'info',
      summary,
      detail,
      life: 3000
    });
  }
}
