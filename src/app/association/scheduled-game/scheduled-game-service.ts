import { inject, Injectable } from '@angular/core';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { mergeProperties, UcroniaClient } from '@ucronia/api';
import { MemberStatus, Profile, PublicMember, ScheduledGame } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduledGameService {

  private readonly ucroniaClient = inject(UcroniaClient);
  private readonly messageService = inject(MessageService);

  public create(data: ScheduledGame): Observable<ScheduledGame> {
    return this.ucroniaClient.scheduledGame.create(data)
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

  public update(data: ScheduledGame): Observable<ScheduledGame> {
    return this.ucroniaClient.scheduledGame.update(data.number, data)
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

  public delete(index: number): Observable<ScheduledGame> {
    return this.ucroniaClient.scheduledGame.delete(index)
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
  ): Observable<Page<ScheduledGame>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [
          new SortingProperty('start')
        ]
      )
    );

    return this.ucroniaClient.scheduledGame
      .page(page, undefined, sorting);
  }

  public getOne(index: number): Observable<ScheduledGame> {
    return this.ucroniaClient.scheduledGame.get(index);
  }

  public getMaster(number: number): Observable<Profile> {
    return this.ucroniaClient.profile.get(number);
  }

  public searchMembers(query: string, status: MemberStatus = MemberStatus.Active): Observable<PublicMember[]> {
    const sorting = new Sorting(
      [
        new SortingProperty('name.firstName'),
        new SortingProperty('name.lastName'),
        new SortingProperty('number')
      ]
    );

    return this.ucroniaClient.memberProfile.page(undefined, 10, sorting, status, query)
      .pipe(map(page => page.content as PublicMember[]));
  }

}
