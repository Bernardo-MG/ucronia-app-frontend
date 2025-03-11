import { Injectable } from '@angular/core';
import { FeePaymentReport } from '@app/models/fees/fee-payment-report';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeReportService {

  private client;

  constructor(
    private clientProvider: AngularCrudClientProvider
  ) {
    this.client = this.clientProvider.url(environment.apiUrl + '/fee/payment');
  }

  public getPaymentReport(): Observable<FeePaymentReport> {
    return this.client
      .read<SimpleResponse<FeePaymentReport>>()
      .pipe(map(r => r.content));
  }

}
