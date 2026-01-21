import { Injectable, inject } from '@angular/core';
import { Month } from '@bernardo-mg/ui';
import { UcroniaClient } from '@ucronia/api';
import { Transaction } from "@ucronia/domain";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class TransactionCalendarService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getCalendarInRange(year: number, month: number): Observable<Transaction[]> {
    return this.ucroniaClient.transaction.calendar(year, month);
  }

  public getRange(): Observable<Month[]> {
    return this.ucroniaClient.transaction.range();
  }

}
