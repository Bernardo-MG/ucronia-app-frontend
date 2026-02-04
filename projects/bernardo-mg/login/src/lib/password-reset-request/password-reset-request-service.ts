import { Injectable, inject } from '@angular/core';
import { SimpleResponse } from '@bernardo-mg/request';
import { SecurityClient } from '@bernardo-mg/security';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class PasswordResetRequestService {

  private readonly securityClient = inject(SecurityClient);

  public requestPasswordReset(email: string): Observable<SimpleResponse<void>> {
    return this.securityClient.password.reset.requestReset({ email });
  }

}
