import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { Transaction } from '../../shared/models/transaction';

@Injectable({
  providedIn: "root"
})
export class TransactionService {

  constructor(
    private http: HttpClient
  ) { }

  public create(data: Transaction): Observable<Transaction> {
    return this.getClient()
      .create<SimpleResponse<Transaction>>(data)
      .pipe(map(r => r.content));
  }

  public update(index: number, data: Transaction): Observable<Transaction> {
    return this.getClient()
      .appendRoute(`/${index}`)
      .update<SimpleResponse<Transaction>>(data)
      .pipe(map(r => r.content));
  }

  public delete(index: number): Observable<boolean> {
    return this.getClient()
      .appendRoute(`/${index}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getOne(index: number): Observable<Transaction> {
    return this.getClient()
      .appendRoute(`/${index}`)
      .read<SimpleResponse<Transaction>>()
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/funds/transaction');
  }

}
