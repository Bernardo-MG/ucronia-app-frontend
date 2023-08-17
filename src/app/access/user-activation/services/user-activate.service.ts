import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStatus } from '@app/access/models/token-status';
import { PasswordReset } from '@app/access/password-reset/models/password-reset';
import { ApiResponse } from '@app/core/api/models/api-response';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AccessUserActivateService {

  private activateUserRequestUrl = environment.apiUrl + "/security/user/activate";

  constructor(
    private http: HttpClient
  ) { }

  public activateUser(token: string, reset: PasswordReset): Observable<ApiResponse<void>> {
    return this.http
      // Validate token request
      .post<ApiResponse<void>>(`${this.activateUserRequestUrl}/${token}`, reset);
  }

  public validateActivateUserToken(token: string): Observable<ApiResponse<TokenStatus>> {
    return this.http
      // Validate token request
      .get<ApiResponse<TokenStatus>>(`${this.activateUserRequestUrl}/${token}`);
  }

}
