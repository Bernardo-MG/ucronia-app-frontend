import { Injectable, inject } from '@angular/core';
import { UserTokenStatus } from '@bernardo-mg/authentication';
import { SimpleResponse } from '@bernardo-mg/request';
import { SecurityClient } from '@bernardo-mg/security';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class PasswordResetService {

  private readonly securityClient = inject(SecurityClient);

  public resetPassword(token: string, password: string): Observable<SimpleResponse<void>> {
    return this.securityClient.password.reset.reset(token, { password });
  }

  public validateToken(token: string): Observable<SimpleResponse<UserTokenStatus>> {
    return this.securityClient.password.reset.validateToken(token);
  }

}
