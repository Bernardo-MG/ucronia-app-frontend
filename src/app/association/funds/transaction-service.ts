import { inject, Injectable } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { mergeProperties, UcroniaClient } from '@ucronia/api';
import { Transaction, TransactionType } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TransactionService {

  private readonly ucroniaClient = inject(UcroniaClient);
  private readonly messageService = inject(MessageService);

  public getTypes(): Observable<TransactionType[]> {
    const endpoint = this.ucroniaClient.transactionType;
    return getAllPages((page, size) => endpoint.page(page, size));
  }

  public getTypesPage(page: number, size: number): Observable<Page<TransactionType>> {
    return this.ucroniaClient.transactionType.page(page, size);
  }

  public getType(number: number): Observable<TransactionType> {
    return this.ucroniaClient.transactionType.get(number);
  }

  public deleteType(number: number): Observable<TransactionType> {
    return this.ucroniaClient.transactionType.delete(number);
  }

  public saveType(values: Pick<TransactionType, 'description' | 'color'>, number?: number): Observable<TransactionType> {
    const endpoint = this.ucroniaClient.transactionType;
    const request: Observable<TransactionType> = number === undefined
      ? endpoint.create(values)
      : endpoint.update(number, values);

    return request.pipe(tap(() => this.messageService.add({
      severity: 'info',
      summary: number === undefined ? 'Tipo de transacción creado' : 'Tipo de transacción actualizado',
      life: 3000
    })));
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
