import { Injectable } from '@angular/core';
import { CreateOperations } from '@app/api/request/create-operations';
import { DeleteOperations } from '@app/api/request/delete-operations';
import { ReadOperations } from '@app/api/request/read-operations';
import { RequestClient } from '@app/api/request/request-client';
import { UpdateOperations } from '@app/api/request/update-operations';
import { Member } from '@app/models/member';
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

  public getAll(): Observable<Transaction[]> {
    const clt: ReadOperations<Transaction> = this.client.read(this.transactionUrl);
    return clt.fetchUnwrapped();
  }

  public create(member: Transaction): Observable<Transaction> {
    const clt: CreateOperations<Transaction> = this.client.create(this.transactionUrl);
    return clt.body(member).pushUnwrapped();
  }

  public update(id: number, member: Transaction): Observable<Transaction> {
    const clt: UpdateOperations<Transaction> = this.client.update(this.transactionUrl);
    return clt.id(id).body(member).pushUnwrapped();
  }

  public delete(id: number): Observable<Transaction> {
    const clt: DeleteOperations<Transaction> = this.client.delete(this.transactionUrl);
    return clt.id(id).pushUnwrapped();
  }

  public getOne(id: number): Observable<Transaction> {
    const clt: ReadOperations<Transaction> = this.client.read(this.transactionUrl + `/${id}`);
    return clt.fetchOneUnwrapped();
  }

}
