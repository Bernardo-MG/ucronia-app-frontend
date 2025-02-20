import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTokenStatus } from '@app/access/models/user-token-status';
import { PasswordReset } from '@app/access/password-reset/models/password-reset';
import { AngularClient, Client, SimpleResponse } from '@bernardo-mg/request';
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
