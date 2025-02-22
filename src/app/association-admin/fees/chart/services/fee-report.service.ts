import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeePaymentReport } from '@app/models/fees/fee-payment-report';
import { AngularCrudClient, CrudClient, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeReportService {

  constructor(
    private http: HttpClient
  ) { }

  public getPaymentReport(): Observable<FeePaymentReport> {
    return this.getClient()
      .read<SimpleResponse<FeePaymentReport>>()
      .pipe(map(r => r.content));
  }

  private getClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/fee/payment');
  }

}
