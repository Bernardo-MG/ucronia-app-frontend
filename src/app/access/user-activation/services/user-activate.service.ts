import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTokenStatus } from '@app/access/models/user-token-status';
import { PasswordReset } from '@app/access/password-reset/models/password-reset';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { AngularRequest } from '@app/core/api/request/angular-request';
import { Request } from '@app/core/api/request/request';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AccessUserActivateService {

  constructor(
    private http: HttpClient
  ) { }

  public activateUser(token: string, reset: PasswordReset): Observable<SimpleResponse<void>> {
    return this.getRequest()
      // Validate token request
      .appendRoute(`/${token}`)
      .create(reset);
  }

  public validateToken(token: string): Observable<SimpleResponse<UserTokenStatus>> {
    return this.getRequest()
      // Validate token request
      .appendRoute(`/${token}`)
      .read();
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/security/user/activate');
  }

}
