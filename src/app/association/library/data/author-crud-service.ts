import { inject, Injectable } from '@angular/core';
import { CrudService } from '@app/shared/data/services/crud-service';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { mergeProperties, UcroniaClient } from '@ucronia/api';
import { Author } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthorCrudService implements CrudService<Author> {

  private readonly ucroniaClient = inject(UcroniaClient);
  private readonly messageService = inject(MessageService);

  public create(data: Author): Observable<Author> {
    return this.ucroniaClient.library.author.create(data)
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

  public update(data: Author): Observable<Author> {
    return this.ucroniaClient.library.author.update(data.number, data)
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

  public getOne(number: number): Observable<Author> {
    return this.ucroniaClient.library.author.get(number);
  }

  public delete(number: number): Observable<Author> {
    return this.ucroniaClient.library.author.delete(number)
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

  public getAll(page: number | undefined, sort: Sorting): Observable<Page<Author>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [new SortingProperty('name'), new SortingProperty('number')]
      )
    );

    return this.ucroniaClient.library.author.page(page, undefined, sorting);
  }

}
