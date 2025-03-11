import { Injectable } from '@angular/core';
import { FeePaymentReport } from '@app/models/fees/fee-payment-report';
import { AngularCrudClientProvider, CrudClient, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeReportService {

  constructor(
    private clientProvider: AngularCrudClientProvider
  ) { }

  public getPaymentReport(): Observable<FeePaymentReport> {
    return this.getClient()
      .read<SimpleResponse<FeePaymentReport>>()
      .pipe(map(r => r.content));
  }

  private getClient(): CrudClient {
    return this.clientProvider.url(environment.apiUrl + '/fee/payment');
  }

}
