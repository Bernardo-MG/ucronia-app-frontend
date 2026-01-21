import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { FeeEndpoint } from './endpoint/fee-endpoint';
import { MemberEndpoint } from './endpoint/member-endpoint';
import { TransactionEndpoint } from './endpoint/transaction-endpoint';

export const UCRONIA_API_BASE_URL = new InjectionToken<string>('UCRONIA_API_BASE_URL');

@Injectable({
  providedIn: 'root',
})
export class UcroniaClient {

  private readonly http = inject(HttpClient);
  private readonly base_url = inject(UCRONIA_API_BASE_URL);

  public get member() {
    return new MemberEndpoint(this.http, this.base_url);
  }

  public get fee() {
    return new FeeEndpoint(this.http, this.base_url);
  }

  public get transaction() {
    return new TransactionEndpoint(this.http, this.base_url);
  }

}
