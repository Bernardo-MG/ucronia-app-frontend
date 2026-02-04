import { Injectable, inject } from '@angular/core';
import { SecurityClient } from '@bernardo-mg/security';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class PasswordResetRequestService {

  private readonly securityClient = inject(SecurityClient);

  /**
   * Request a password reset for the user identified by the email.
   * 
   * @param email email of the user to reset the password for
   * @returns empty response
   */
  public requestPasswordReset(email: string): Observable<void> {
    return this.securityClient.password.reset.requestReset({ email });
  }

}
