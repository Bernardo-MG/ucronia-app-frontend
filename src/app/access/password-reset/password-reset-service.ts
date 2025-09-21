import { Injectable, inject } from '@angular/core';
import { UserTokenStatus } from '@app/access/models/user-token-status';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Password } from '../models/password';
import { Email } from '../models/email';

@Injectable({
  providedIn: "root"
})
export class PasswordResetService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/password/reset');
  }

  public requestResetPassword(request: Email): Observable<SimpleResponse<void>> {
    return this.client
      // Reset password request
      .create(request);
  }

  public resetPassword(token: string, reset: Password): Observable<SimpleResponse<void>> {
    return this.client
      // Reset password
      .appendRoute(`/${token}`)
      .create(reset);
  }

  public validateToken(token: string): Observable<SimpleResponse<UserTokenStatus>> {
    return this.client
      // Validate token request
      .appendRoute(`/${token}`)
      .read<SimpleResponse<UserTokenStatus>>();
  }

}
