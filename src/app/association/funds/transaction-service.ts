import { inject, Injectable } from '@angular/core';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { mergeProperties, UcroniaClient } from '@ucronia/api';
import { Transaction, TransactionType } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { catchError, EMPTY, expand, Observable, reduce, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TransactionService {

  private readonly ucroniaClient = inject(UcroniaClient);
  private readonly messageService = inject(MessageService);

  public getTypes(): Observable<TransactionType[]> {
    const endpoint = this.ucroniaClient.transactionType;

    return endpoint.page().pipe(
      expand(page => page.page < page.totalPages ? endpoint.page(page.page + 1) : EMPTY),
      reduce((types, page) => types.concat(page.content), [] as TransactionType[])
    );
  }

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

  public getAll(page: number | undefined = undefined, description: string | undefined = undefined, sort: Sorting = new Sorting()): Observable<Page<Transaction>> {
    const sorting = new Sorting(mergeProperties(sort.properties, [
      new SortingProperty('date'),
      new SortingProperty('description')
    ]));
    return this.ucroniaClient.transaction
      .page(page, undefined, sorting, description, undefined, undefined);
  }

  public getOne(index: number): Observable<Transaction> {
    return this.ucroniaClient.transaction.get(index);
  }

}
