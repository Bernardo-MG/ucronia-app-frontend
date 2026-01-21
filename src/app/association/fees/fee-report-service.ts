import { Injectable, inject } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { FeePaymentReport } from "@ucronia/domain";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeReportService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getPaymentReport(): Observable<FeePaymentReport> {
    return this.ucroniaClient.fee.balance();
  }

}
