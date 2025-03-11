import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularErrorRequestInterceptor } from '../interceptors/angular-error-request-interceptor';
import { AngularCrudClient } from './angular-crud-client';

/**
 * Client implementation for Angular.
 */
@Injectable({
  providedIn: "root"
})
export class AngularCrudClientProvider {

  constructor(
    private readonly http: HttpClient,
    private readonly errorInterceptor: AngularErrorRequestInterceptor
  ) { }

  public url(url: string): AngularCrudClient {
    return new AngularCrudClient(this.http, url, this.errorInterceptor);
  }

}
