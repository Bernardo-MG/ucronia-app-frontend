import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { AngularRequest } from '@app/core/api/request/angular-request';
import { Request } from '@app/core/api/request/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable()
export class TransactionService {

  constructor(
    private http: HttpClient
  ) { }

  public create(data: Transaction): Observable<Transaction> {
    return this.getRequest()
      .create<SimpleResponse<Transaction>>(data)
      .pipe(map(r => r.content));
  }

  public update(index: number, data: Transaction): Observable<Transaction> {
    return this.getRequest()
      .appendRoute(`/${index}`)
      .update<SimpleResponse<Transaction>>(data)
      .pipe(map(r => r.content));
  }

  public delete(index: number): Observable<boolean> {
    return this.getRequest()
      .appendRoute(`/${index}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getOne(index: number): Observable<Transaction> {
    return this.getRequest()
      .appendRoute(`/${index}`)
      .read<SimpleResponse<Transaction>>()
      .pipe(map(r => r.content));
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/funds/transaction');
  }

}
