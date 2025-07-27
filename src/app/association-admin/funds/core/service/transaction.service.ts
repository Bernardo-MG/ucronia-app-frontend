import { Injectable, inject } from '@angular/core';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { Transaction } from '../../../../models/transactions/transaction';

@Injectable({
  providedIn: "root"
})
export class TransactionService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/funds/transaction');
  }

  public create(data: Transaction): Observable<Transaction> {
    return this.client
      .create<SimpleResponse<Transaction>>(data)
      .pipe(map(r => r.content));
  }

  public update(index: number, data: Transaction): Observable<Transaction> {
    return this.client
      .appendRoute(`/${index}`)
      .update<SimpleResponse<Transaction>>(data)
      .pipe(map(r => r.content));
  }

  public delete(index: number): Observable<boolean> {
    return this.client
      .appendRoute(`/${index}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getOne(index: number): Observable<Transaction> {
    return this.client
      .appendRoute(`/${index}`)
      .read<SimpleResponse<Transaction>>()
      .pipe(map(r => r.content));
  }

}
