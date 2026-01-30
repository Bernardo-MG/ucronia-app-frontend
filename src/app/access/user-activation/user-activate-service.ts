import { Injectable, inject } from '@angular/core';
import { User, UserTokenStatus } from '@bernardo-mg/authentication';
import { SimpleResponse } from '@bernardo-mg/request';
import { SecurityClient } from '@bernardo-mg/security';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AccessUserActivateService {

  private readonly securityClient = inject(SecurityClient);

  public activateUser(token: string, password: string): Observable<SimpleResponse<User>> {
    return this.securityClient.user.onboarding.activate(token, { password });
  }

  public validateToken(token: string): Observable<SimpleResponse<UserTokenStatus>> {
    return this.securityClient.user.onboarding.validateToken(token);
  }

}
