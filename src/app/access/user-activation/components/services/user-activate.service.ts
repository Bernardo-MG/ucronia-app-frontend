import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccessApiClient } from '@app/core/api/client/access-api-client';
import { ApiResponse } from '@app/core/api/models/api-response';
import { PasswordReset } from '@app/password-reset/models/password-reset';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AccessUserActivateService {

  private activateUserRequestUrl = environment.apiUrl + "/security/user/activate";

  constructor(
    private client: AccessApiClient,
    private http: HttpClient
  ) { }

  public activateUser(token: string, reset: PasswordReset): Observable<ApiResponse<void>> {
    return this.http
      // Validate token request
      .post<ApiResponse<void>>(`${this.activateUserRequestUrl}/${token}`, reset);
  }

  public validateActivateUserToken(token: string): Observable<ApiResponse<boolean>> {
    return this.http
      // Validate token request
      .get<ApiResponse<boolean>>(`${this.activateUserRequestUrl}/${token}`);
  }

}
