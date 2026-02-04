import { Injectable, inject } from '@angular/core';
import { UserTokenStatus } from '@bernardo-mg/authentication';
import { SecurityClient } from '@bernardo-mg/security';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class PasswordResetService {

  private readonly securityClient = inject(SecurityClient);

  /**
   * Resets the password for the user identified by the token.
   * 
   * @param token token identifying the user
   * @param password new password for the user
   * @returns empty response
   */
  public resetPassword(token: string, password: string): Observable<void> {
    return this.securityClient.password.reset.reset(token, { password });
  }

  /**
   * Validates the user token for the password reset.
   * 
   * @param token token identifying the user
   * @returns the token status
   */
  public validateToken(token: string): Observable<UserTokenStatus> {
    return this.securityClient.password.reset.validateToken(token);
  }

}
