import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { FeePaymentReport } from '../models/fee-payment-report';

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

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/fee/payment');
  }

}
