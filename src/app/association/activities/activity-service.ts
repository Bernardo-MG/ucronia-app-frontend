import { inject, Injectable } from '@angular/core';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { mergeProperties, UcroniaClient } from '@ucronia/api';
import { Activity } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {

  private readonly ucroniaClient = inject(UcroniaClient);
  private readonly messageService = inject(MessageService);

  public create(data: Activity): Observable<Activity> {
    return this.ucroniaClient.activity.create(data)
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

  public update(data: Activity): Observable<Activity> {
    return this.ucroniaClient.activity.update(data.number, data)
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

  public delete(index: number): Observable<Activity> {
    return this.ucroniaClient.activity.delete(index)
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

  public getAll(
    page: number | undefined = undefined,
    sort: Sorting
  ): Observable<Page<Activity>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [
          new SortingProperty('title')
        ]
      )
    );

    return this.ucroniaClient.activity
      .page(page, undefined, sorting);
  }

  public getOne(index: number): Observable<Activity> {
    return this.ucroniaClient.activity.get(index);
  }

}
