import { Injectable, inject } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { TransactionSummary, TransactionMonthlyBalance } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TransactionBalanceService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public summary(): Observable<TransactionSummary> {
    return this.ucroniaClient.transaction.summary();
  }

  public monthly(from: Date | undefined, to: Date | undefined): Observable<TransactionMonthlyBalance[]> {
    return this.ucroniaClient.transaction.monthlyBalance(from, to);
  }

}
