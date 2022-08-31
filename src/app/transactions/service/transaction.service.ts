import { Injectable } from '@angular/core';
import { CreateOperations } from '@app/api/request/create-operations';
import { RequestClient } from '@app/api/request/request-client';
import { Transaction } from '@app/models/transaction';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionUrl = environment.apiUrl + "/transaction";

  constructor(
    private client: RequestClient
  ) { }

  public create(member: Transaction): Observable<Transaction> {
    const clt: CreateOperations<Transaction> = this.client.create(this.transactionUrl);
    return clt.body(member).pushUnwrapped();
  }
}
