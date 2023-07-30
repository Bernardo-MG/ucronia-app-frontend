import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { LoginRequest } from '@app/login/models/login-request';
import { SecurityStatus } from '@app/core/authentication/models/security-status';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { PasswordResetRequest } from '../models/password-reset-request';

@Injectable()
export class LoginService {

  /**
   * Login endpoint URL.
   */
  private loginUrl = environment.apiUrl + "/login";
  
  private passwordResetUrl = environment.apiUrl + "/password/reset";

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Logs in a user. This requires sending a login request. If the request fails it returns an
   * empty login details object, otherwise it returns the login details received from the API.
   * 
   * If the 'remember me' flag is active, the user will be stored in the local storage.
   * 
   * @param request login request
   * @returns the user resulting from the login
   */
  public login(request: LoginRequest): Observable<SecurityStatus> {
    return this.http
      // Login request
      .post<ApiResponse<SecurityStatus>>(this.loginUrl, request)
      // Get content
      .pipe(map(response => response.content));
  }
  
  public resetPassword(request: PasswordResetRequest) {
    return this.http
      // Reset password request
      .post<ApiResponse<void>>(this.passwordResetUrl, request);
  }

}