import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
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
    return this.getRequest().create<ApiResponse<Transaction>>(data).pipe(map(r => r.content));
  }

  public update(index: number, data: Transaction): Observable<Transaction> {
    return this.getRequest().appendRoute(`/${index}`).update<ApiResponse<Transaction>>(data).pipe(map(r => r.content));
  }

  public delete(index: number): Observable<boolean> {
    return this.getRequest().appendRoute(`/${index}`).delete<ApiResponse<boolean>>().pipe(map(r => r.content));
  }

  public getOne(index: number): Observable<Transaction> {
    return this.getRequest().appendRoute(`/${index}`).read<ApiResponse<Transaction>>().pipe(map(r => r.content));
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/funds/transaction');
  }

}
