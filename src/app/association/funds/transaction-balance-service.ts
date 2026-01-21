import { Injectable, inject } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { TransactionCurrentBalance, TransactionMonthlyBalance } from "@ucronia/domain";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TransactionBalanceService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public current(): Observable<TransactionCurrentBalance> {
    return this.ucroniaClient.transaction.currentBalance();
  }

  public monthly(from: Date | undefined, to: Date | undefined): Observable<TransactionMonthlyBalance[]> {
    return this.ucroniaClient.transaction.monthlyBalance(from, to);
  }

}
