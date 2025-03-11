import { Injectable } from '@angular/core';
import { UserTokenStatus } from '@app/access/models/user-token-status';
import { PasswordReset } from '@app/access/password-reset/models/password-reset';
import { AngularCrudClientProvider, CrudClient, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AccessUserActivateService {

  constructor(
    private clientProvider: AngularCrudClientProvider
  ) { }

  public activateUser(token: string, reset: PasswordReset): Observable<SimpleResponse<void>> {
    return this.getClient()
      // Validate token request
      .appendRoute(`/${token}`)
      .create(reset);
  }

  public validateToken(token: string): Observable<SimpleResponse<UserTokenStatus>> {
    return this.getClient()
      // Validate token request
      .appendRoute(`/${token}`)
      .read();
  }

  private getClient(): CrudClient {
    return this.clientProvider.url(environment.apiUrl + '/security/user/activate');
  }

}
