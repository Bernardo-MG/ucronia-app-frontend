import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { LoginRequest } from '@app/core/authentication/models/login-request';
import { SecurityStatus } from '@app/core/authentication/models/security-status';
import { SecurityContainer } from '@app/core/authentication/services/security-container.service';
import { environment } from 'environments/environment';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class LoginService {

  /**
   * Login endpoint URL.
   */
  private loginUrl = environment.apiUrl + "/login";

  constructor(
    private http: HttpClient,
    private securityContainer: SecurityContainer
  ) { }

  /**
   * Logs in a user. This requires sending a login request. If the request fails it returns an
   * empty login details object, otherwise it returns the login details received from the API.
   * 
   * If the 'remember me' flag is active, the user will be stored in the local storage.
   * 
   * @param request login request
   * @param rememberMe remember me flag
   * @returns the user resulting from the login
   */
  public login(request: LoginRequest, rememberMe: boolean): Observable<SecurityStatus> {
    return this.http
      // Login request
      .post<ApiResponse<SecurityStatus>>(this.loginUrl, request)
      // Get content
      .pipe(map(response => response.content))
      // Store use
      .pipe(tap(user => this.storeUser(user, rememberMe)));
  }

  /**
   * Logs out the current user.
   */
  public logout() {
    this.securityContainer.reset();
  }

  /**
   * Stores the received login details. This takes two steps, first it is stored in the local
   * subject. Then, if the 'remember me' flag is enabled, it will be stored in the local storage.
   * 
   * @param loginDetails login details to store
   * @param rememberMe remember me flag
   */
  private storeUser(loginDetails: SecurityStatus, rememberMe: boolean) {
    this.securityContainer.setStatus(loginDetails, rememberMe);
  }

}
