import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'environments/environment';
import { Observable, ReplaySubject, map, tap } from 'rxjs';
import { PermissionsSet } from '../models/permissions.set';
import { SecurityStatus } from '../models/security-status';

/**
 * Security details container.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  /**
   * User key for storing user status into the local storage.
   */
  private userKey = 'user';

  /**
   * Subject with the user status.
   */
  private statusSubject = new ReplaySubject<SecurityStatus>(1);

  /**
   * Permissions endpoint URL.
   */
  private permissionUrl = environment.apiUrl + "/security/permission";

  private jwtHelper = new JwtHelperService();

  private status = new SecurityStatus();

  constructor(
    private http: HttpClient
  ) {

    // Watch for changes in the status
    this.statusSubject.subscribe((s) => {
      this.status = s;
    });

    // Load the stored status
    this.loadStatusFromLocal();
    // Clear up status if the token is invalid
    this.verifyToken();
  }

  /**
   * Clears out the authentication status, logging out the user in session.
   */
  public logout() {
    // Replace local data with empty user status
    this.statusSubject.next(new SecurityStatus());

    // Clear local storage
    localStorage.removeItem(this.userKey);
  }

  /**
   * Returns the security token for the user currently in session.
   * @returns the user security token
   */
  public getToken(): string | undefined {
    return this.status.token;
  }

  /**
   * Returns if the current user is logged in.
   * @returns if the current user is logged in
   */
  public isLogged(): boolean {
    return this.status.logged;
  }

  /**
   * Returns the user status for the user currently in session as an observable. This allows reacting to new logins or logouts.
   * 
   * @returns the user status for the user currently in session as an observable
   */
  public getStatus(): Observable<SecurityStatus> {
    return this.statusSubject.asObservable();
  }

  /**
   * Stores the received user status. This takes two steps, first it is stored in the local
   * subject. Then, if the 'remember me' option is enabled, it will be stored in the local storage.
   * 
   * @param user user status to store
   */
  public setStatus(user: SecurityStatus, rememberMe: boolean) {
    this.statusSubject.next(user);

    if (rememberMe) {
      // Store user status in the local storage
      // This allows getting them back on a page reload
      localStorage.setItem(this.userKey, JSON.stringify(user));
    } else {
      // Remember me disabled
      // Remove stored details
      localStorage.removeItem(this.userKey);
    }
  }

  public hasPermission(resource: string, action: string): boolean {
    let hasPermission;

    const permissions = this.status.permissions;
    if (permissions != undefined) {
      const key = resource;
      if (key in permissions) {
        hasPermission = permissions[key].includes(action);
      } else {
        hasPermission = false;
      }
    } else {
      hasPermission = false;
    }

    return hasPermission;
  }

  public loadPermissions(): Observable<PermissionsSet> {
    return this.http
      // Request permissions
      .get<ApiResponse<PermissionsSet>>(this.permissionUrl)
      // Get content
      .pipe(map(response => response.content))
      // Store in status
      .pipe(tap(permissions => this.status.permissions = permissions.permissions));
  }

  /**
   * Reads the login status from the local storage. This allows recovering users stored as part of
   * the 'remember me' functionality.
   * 
   * @returns the user stored in the local storage as part of the 'remember me'
   */
  private loadStatusFromLocal() {
    // If the user was stored, load it
    const localUser = localStorage.getItem(this.userKey);
    if (localUser) {
      // User found in local storage
      const readUser = JSON.parse(localUser);
      this.statusSubject.next(readUser);
    } else {
      // User not found
      // Use default user
      this.statusSubject.next(new SecurityStatus());
    }
  }

  private verifyToken() {
    const token = this.getToken();
    if ((token) && (this.jwtHelper.isTokenExpired(token))) {
      // Token expired 
      // Use default user
      this.statusSubject.next(new SecurityStatus());
    }
  }

}
