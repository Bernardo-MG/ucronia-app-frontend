import { Injectable, inject } from '@angular/core';
import { Month } from '@bernardo-mg/ui';
import { UcroniaClient } from '@ucronia/api';
import { TransactionMonthlyBalance, TransactionSummary } from '@ucronia/domain';
import { endOfMonth, startOfMonth } from 'date-fns';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TransactionBalanceService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public summary(): Observable<TransactionSummary> {
    return this.ucroniaClient.transaction.summary();
  }

  public monthly(start: Month | undefined, end: Month | undefined): Observable<TransactionMonthlyBalance[]> {
    let startDate;
    if (start) {
      startDate = startOfMonth(new Date(start.year, start.month - 1, 1));
    } else {
      startDate = undefined;
    }

    let endDate;
    if (end) {
      endDate = endOfMonth(new Date(end.year, end.month - 1, 1));
    } else {
      endDate = undefined;
    }

    return this.ucroniaClient.transaction.monthlyBalance(startDate, endDate);
  }

}
