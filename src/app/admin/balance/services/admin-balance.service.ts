import { Injectable } from '@angular/core';
import { CreateOperations } from '@app/api/request/create-operations';
import { ReadOperations } from '@app/api/request/read-operations';
import { RequestClient } from '@app/api/request/request-client';
import { Balance } from '@app/models/balance';
import { Transaction } from '@app/models/transaction';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminBalanceService {

  private transactionUrl = environment.apiUrl + "/transaction";

  private balanceUrl = environment.apiUrl + "/balance";

  constructor(
    private client: RequestClient
  ) { }

  public create(member: Transaction): Observable<Transaction> {
    const clt: CreateOperations<Transaction> = this.client.create(this.transactionUrl);
    return clt.body(member).pushUnwrapped();
  }

  public getBalance(): Observable<Balance> {
    const clt: ReadOperations<Balance> = this.client.read(this.balanceUrl);
    return clt.fetchOneUnwrapped();
  }

}
