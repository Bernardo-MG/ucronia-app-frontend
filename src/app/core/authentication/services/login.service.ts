import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/shared/utils/api/models/api-response';
import { environment } from 'environments/environment';
import { map, Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginStatus } from '../models/login-status';
import { UserStatus } from '../models/user-status';
import { AuthenticationContainer } from './authentication-container.service';

@Injectable()
export class LoginService {

  /**
   * Login endpoint URL.
   */
  private loginUrl = environment.apiUrl + "/login";

  constructor(
    private http: HttpClient,
    private authenticationContainer: AuthenticationContainer
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
  public login(request: LoginRequest, rememberMe: boolean): Observable<UserStatus> {
    return this.http.post<ApiResponse<LoginStatus>>(this.loginUrl, request)
      .pipe(map(response => response.content))
      .pipe(map(response => this.toUser(response)))
      .pipe(tap(user => this.storeUser(user, rememberMe)));
  }

  /**
   * Logs out the current user.
   */
  public logout() {
    this.authenticationContainer.reset();
  }

  /**
   * Maps the login status into a user.
   * 
   * @param status status to map
   * @returns user generated from the login status
   */
  private toUser(status: LoginStatus): UserStatus {
    const loggedUser = new UserStatus();
    if (status) {
      // Received data
      loggedUser.username = status.username;
      loggedUser.logged = status.successful;
      loggedUser.token = status.token;
    }

    return loggedUser;
  }

  /**
   * Stores the received login details. This takes two steps, first it is stored in the local
   * subject. Then, if the 'remember me' flag is enabled, it will be stored in the local storage.
   * 
   * @param loginDetails login details to store
   * @param rememberMe remember me flag
   */
  private storeUser(loginDetails: UserStatus, rememberMe: boolean) {
    this.authenticationContainer.setUserStatus(loginDetails, rememberMe);
  }

}
