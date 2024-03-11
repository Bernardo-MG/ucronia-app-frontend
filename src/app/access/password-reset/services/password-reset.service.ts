import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTokenStatus } from '@app/access/models/user-token-status';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { AngularRequest } from '@app/core/api/request/angular-request';
import { Request } from '@app/core/api/request/request';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PasswordReset } from '../models/password-reset';
import { PasswordResetRequest } from '../models/password-reset-request';

@Injectable()
export class PasswordResetService {

  constructor(
    private http: HttpClient
  ) { }

  public requestResetPassword(request: PasswordResetRequest): Observable<SimpleResponse<void>> {
    return this.getRequest()
      // Reset password request
      .create(request);
  }

  public resetPassword(token: string, reset: PasswordReset): Observable<SimpleResponse<void>> {
    return this.getRequest()
      // Reset password
      .appendRoute(`/${token}`)
      .create(reset);
  }

  public validateToken(token: string): Observable<SimpleResponse<UserTokenStatus>> {
    return this.getRequest()
      // Validate token request
      .appendRoute(`/${token}`)
      .read<SimpleResponse<UserTokenStatus>>();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/password/reset');
  }

}
