import { Injectable } from '@angular/core';
import { FeePaymentReport } from '@app/models/fees/fee-payment-report';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeReportService {

  private readonly client;

  constructor(
    clientProvider: AngularCrudClientProvider
  ) {
    this.client = clientProvider.url(environment.apiUrl + '/fee/payment');
  }

  public getPaymentReport(): Observable<FeePaymentReport> {
    return this.client
      .read<SimpleResponse<FeePaymentReport>>()
      .pipe(map(r => r.content));
  }

}
