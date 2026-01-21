import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { FeeEndpoint } from './endpoint/fee-endpoint';
import { GuestEndpoint } from './endpoint/guest-endpoint copy';
import { MemberEndpoint } from './endpoint/member-endpoint';
import { MemberProfileEndpoint } from './endpoint/member-profile-endpoint';
import { MyFeesEndpoint } from './endpoint/my-fees-endpoint';
import { ProfileEndpoint } from './endpoint/profile-endpoint';
import { SponsorEndpoint } from './endpoint/sponsor-endpoint';
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

  public get profile() {
    return new ProfileEndpoint(this.http, this.base_url);
  }

  public get guest() {
    return new GuestEndpoint(this.http, this.base_url);
  }

  public get sponsor() {
    return new SponsorEndpoint(this.http, this.base_url);
  }

  public get memberProfile() {
    return new MemberProfileEndpoint(this.http, this.base_url);
  }

  public get fee() {
    return new FeeEndpoint(this.http, this.base_url);
  }

  public get transaction() {
    return new TransactionEndpoint(this.http, this.base_url);
  }

  public get myFees() {
    return new MyFeesEndpoint(this.http, this.base_url);
  }

}
