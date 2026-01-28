import { Injectable, inject } from '@angular/core';
import { UserTokenStatus } from '@app/access/models/user-token-status';
import { SimpleResponse } from '@bernardo-mg/request';
import { SecurityClient } from '@bernardo-mg/security';
import { Observable } from 'rxjs';
import { Email } from '../models/email';
import { Password } from '../models/password';

@Injectable({
  providedIn: "root"
})
export class PasswordResetService {

  private securityClient = inject(SecurityClient);

  public requestResetPassword(request: Email): Observable<SimpleResponse<void>> {
    return this.securityClient.password.reset.requestReset(request);
  }

  public resetPassword(token: string, reset: Password): Observable<SimpleResponse<void>> {
    return this.securityClient.password.reset.reset(token, reset);
  }

  public validateToken(token: string): Observable<SimpleResponse<UserTokenStatus>> {
    return this.securityClient.password.reset.validateToken(token);
  }

}
