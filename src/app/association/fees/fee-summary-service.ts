import { Injectable, inject } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { FeePaymentSummary } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeSummaryService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getSummary(): Observable<FeePaymentSummary> {
    return this.ucroniaClient.fee.summary();
  }

}
