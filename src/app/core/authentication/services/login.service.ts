import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { LoginRequest } from '@app/core/authentication/models/login-request';
import { SecurityStatus } from '@app/core/authentication/models/security-status';
import { SecurityContainer } from '@app/core/authentication/services/security-container.service';
import { environment } from 'environments/environment';
import { map, Observable, tap } from 'rxjs';
import { PermissionsSet } from '../models/permissions.set';

@Injectable()
export class LoginService {

  /**
   * Login endpoint URL.
   */
  private loginUrl = environment.apiUrl + "/login";
  
  /**
   * Permissions endpoint URL.
   */
  private permissionUrl = environment.apiUrl + "/security/permission";

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
      // Store user
      .pipe(tap(user => this.storeUser(user, rememberMe)))
      // Loads permissions
      .pipe(tap(user => this.loadPermissions()));
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

  private loadPermissions() {
    this.http
      // Request permissions
      .get<ApiResponse<PermissionsSet>>(this.permissionUrl)
      // Get content
      .pipe(map(response => response.content))
      // Store in user
      .subscribe(permissions => {
        const status = this.securityContainer.getStatus();
        status.permissions = permissions.permissions;
      });
  }

}
