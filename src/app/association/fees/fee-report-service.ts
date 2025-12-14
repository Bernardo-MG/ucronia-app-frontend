import { Injectable, inject } from '@angular/core';
import { FeePaymentReport } from '@ucronia/domain';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FeeReportService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/fee/balance');
  }

  public getPaymentReport(): Observable<FeePaymentReport> {
    return this.client
      .read<SimpleResponse<FeePaymentReport>>()
      .pipe(map(r => r.content));
  }

}
