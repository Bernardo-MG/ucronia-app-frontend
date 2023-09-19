import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionApi } from '@app/association/api/transaction-api';
import { map, Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable()
export class TransactionService {

  private transactionApi = new TransactionApi(this.http);

  constructor(
    private http: HttpClient
  ) { }

  public create(data: Transaction): Observable<Transaction> {
    return this.transactionApi.create(data).pipe(map(r => r.content));
  }

  public update(id: number, data: Transaction): Observable<Transaction> {
    return this.transactionApi.updateById(id, data).pipe(map(r => r.content));
  }

  public delete(id: number): Observable<boolean> {
    return this.transactionApi.deleteById(id).pipe(map(r => r.content));
  }

  public getOne(id: number): Observable<Transaction> {
    return this.transactionApi.readById(id).pipe(map(r => r.content));
  }

}
