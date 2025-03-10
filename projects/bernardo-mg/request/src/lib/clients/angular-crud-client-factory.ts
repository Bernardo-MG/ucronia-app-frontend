import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularErrorRequestInterceptor } from '../interceptors/angular-error-request-interceptor';
import { AngularCrudClient } from './angular-crud-client';

/**
 * Client implementation for Angular.
 */
@Injectable({
  providedIn: "root"
})
export class AngularCrudClientFactory {

  /**
   * Route for the request. Will be built by the client.
   */
  private route = '';

  /**
   * Request options. Used to store the params.
   */
  protected options: {
    params?: HttpParams
  } = {};

  constructor(
    private http: HttpClient,
    private errorInterceptor: AngularErrorRequestInterceptor = new AngularErrorRequestInterceptor()
  ) { }

  public url(url: string): AngularCrudClient {
    return new AngularCrudClient(this.http, url, this.errorInterceptor);
  }

}
