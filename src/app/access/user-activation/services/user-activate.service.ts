import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTokenStatus } from '@app/access/models/user-token-status';
import { PasswordReset } from '@app/access/password-reset/models/password-reset';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AccessUserActivateService {

  constructor(
    private http: HttpClient
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

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/security/user/activate');
  }

}
