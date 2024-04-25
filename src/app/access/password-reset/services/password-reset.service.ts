import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTokenStatus } from '@app/access/models/user-token-status';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PasswordReset } from '../models/password-reset';
import { PasswordResetRequest } from '../models/password-reset-request';

@Injectable({
  providedIn: "root"
})
export class PasswordResetService {

  constructor(
    private http: HttpClient
  ) { }

  public requestResetPassword(request: PasswordResetRequest): Observable<SimpleResponse<void>> {
    return this.getClient()
      // Reset password request
      .create(request);
  }

  public resetPassword(token: string, reset: PasswordReset): Observable<SimpleResponse<void>> {
    return this.getClient()
      // Reset password
      .appendRoute(`/${token}`)
      .create(reset);
  }

  public validateToken(token: string): Observable<SimpleResponse<UserTokenStatus>> {
    return this.getClient()
      // Validate token request
      .appendRoute(`/${token}`)
      .read<SimpleResponse<UserTokenStatus>>();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/password/reset');
  }

}
