import { inject, Injectable } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { Transaction } from "@ucronia/domain";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TransactionService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public create(data: Transaction): Observable<Transaction> {
    return this.ucroniaClient.transaction.create(data);
  }

  public update(data: Transaction): Observable<Transaction> {
    return this.ucroniaClient.transaction.update(data.index, data);
  }

  public delete(index: number): Observable<Transaction> {
    return this.ucroniaClient.transaction.delete(index);
  }

  public getOne(index: number): Observable<Transaction> {
    return this.ucroniaClient.transaction.get(index);
  }

}
