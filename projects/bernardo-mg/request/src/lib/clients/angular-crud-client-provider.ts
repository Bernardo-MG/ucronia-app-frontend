import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularErrorRequestInterceptor } from '../interceptors/angular-error-request-interceptor';
import { AngularCrudClient } from './angular-crud-client';
import { CrudClient } from './crud-client';

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

  public url(url: string): CrudClient {
    return new AngularCrudClient(this.http, url, this.errorInterceptor);
  }

}
