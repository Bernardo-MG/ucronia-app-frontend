import { Injectable, inject } from '@angular/core';
import { Password } from '@app/access/models/password';
import { UserTokenStatus } from '@app/access/models/user-token-status';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AccessUserActivateService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/security/user/onboarding/activate');
  }

  public activateUser(token: string, reset: Password): Observable<SimpleResponse<void>> {
    return this.client
      // Validate token request
      .appendRoute(`/${token}`)
      .create(reset);
  }

  public validateToken(token: string): Observable<SimpleResponse<UserTokenStatus>> {
    return this.client
      // Validate token request
      .appendRoute(`/${token}`)
      .read();
  }

}
