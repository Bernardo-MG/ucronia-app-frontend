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

  public update(index: number, data: Transaction): Observable<Transaction> {
    return this.transactionApi.updateById(index, data).pipe(map(r => r.content));
  }

  public delete(index: number): Observable<boolean> {
    return this.transactionApi.deleteById(index).pipe(map(r => r.content));
  }

  public getOne(index: number): Observable<Transaction> {
    return this.transactionApi.readById(index).pipe(map(r => r.content));
  }

}
