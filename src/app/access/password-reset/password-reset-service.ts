import { Injectable, inject } from '@angular/core';
import { UserTokenStatus } from '@app/access/models/user-token-status';
import { SimpleResponse } from '@bernardo-mg/request';
import { SecurityClient } from '@bernardo-mg/security';
import { Observable } from 'rxjs';
import { Email } from '../models/email';

@Injectable({
  providedIn: "root"
})
export class PasswordResetService {

  private securityClient = inject(SecurityClient);

  public requestResetPassword(request: Email): Observable<SimpleResponse<void>> {
    return this.securityClient.password.reset.requestReset(request);
  }

  public resetPassword(token: string, password: string): Observable<SimpleResponse<void>> {
    return this.securityClient.password.reset.reset(token, { password });
  }

  public validateToken(token: string): Observable<SimpleResponse<UserTokenStatus>> {
    return this.securityClient.password.reset.validateToken(token);
  }

}
