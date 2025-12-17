import { inject, Injectable } from '@angular/core';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { ContactMethod } from "@ucronia/domain";
import { environment } from 'environments/environment';
import { MessageService } from 'primeng/api';
import { catchError, expand, map, Observable, of, reduce, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactMethodService {

  private readonly messageService = inject(MessageService);

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/contact/contactMethod');
  }

  public getAll(page: number | undefined): Observable<PaginatedResponse<ContactMethod>> {
    const sorting = new SortingParams(
      [new SortingProperty('name')]
    );

    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read<PaginatedResponse<ContactMethod>>();
  }

  public getAllAvailable(): Observable<ContactMethod[]> {
    const sorting = new SortingParams(
      [new SortingProperty('name')]
    );
    const pageSize = 100;

    return this.client
      .loadParameters(new PaginationParams(1, pageSize))
      .loadParameters(sorting)
      .read<PaginatedResponse<ContactMethod>>()
      .pipe(
        expand(response => {
          if (!response.last) {
            const nextPage = response.page + 1;
            return this.client
              .loadParameters(new PaginationParams(nextPage, pageSize))
              .loadParameters(sorting)
              .read<PaginatedResponse<ContactMethod>>();
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
    return this.client
      .create<SimpleResponse<ContactMethod>>(data)
      .pipe(
        map(r => r.content),
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
    return this.client
      .appendRoute(`/${data.number}`)
      .update<SimpleResponse<ContactMethod>>(data)
      .pipe(
        map(r => r.content),
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
    return this.client
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<ContactMethod>>()
      .pipe(
        map(r => r.content),
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
