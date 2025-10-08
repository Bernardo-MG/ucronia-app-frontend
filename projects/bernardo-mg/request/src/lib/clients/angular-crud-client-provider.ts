import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
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
  private readonly http = inject(HttpClient);
  private readonly errorInterceptor = inject(AngularErrorRequestInterceptor);


  public url(url: string): CrudClient {
    return new AngularCrudClient(this.http, url, this.errorInterceptor);
  }

}
