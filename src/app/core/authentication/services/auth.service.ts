import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, ReplaySubject } from 'rxjs';
import { SecurityDetails } from '../models/security-details';
import { LoginStatus } from '../models/login-status';
import { TokenData } from '../models/token-data';

/**
 * Authentication and authorization details container.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthContainer {

  /**
   * User key for storing user status into the local storage.
   */
  private detailsKey = 'securityDetails';

  /**
   * Subject with the user status.
   */
  private detailsSubject = new ReplaySubject<SecurityDetails>(1);

  private jwtHelper = new JwtHelperService();

  private details = new SecurityDetails(false);

  constructor() {
    // Watch for changes in the status
    this.detailsSubject.subscribe((s) => {
      this.details = s;
    });

    // Load the stored status
    this.loadDetailsFromLocal();
    // Clear up status if the token is invalid
    this.checkTokenExpired();
  }

  /**
   * Clears out the authentication status, logging out the user in session.
   */
  public logout() {
    // Replace local data with empty user status
    this.detailsSubject.next(new SecurityDetails(false));

    // Clear local storage
    localStorage.removeItem(this.detailsKey);
  }

  /**
   * Returns the security token for the user currently in session.
   * @returns the user security token
   */
  public getToken(): string | undefined {
    return this.details.token;
  }

  /**
   * Returns if the current user is logged in.
   * @returns if the current user is logged in
   */
  public isLogged(): boolean {
    return this.details.logged;
  }

  /**
   * Returns the user status for the user currently in session as an observable. This allows reacting to new logins or logouts.
   * 
   * @returns the user status for the user currently in session as an observable
   */
  public getDetails(): Observable<SecurityDetails> {
    return this.detailsSubject.asObservable();
  }

  /**
   * Stores the received security details. If the store flag is set, then this will be kept in the
   * local storage, to keep the session alive when reloading.
   * 
   * @param details security details to store
   * @param store keep the details in the local storage
   */
  public setDetails(loginStatus: LoginStatus, store: boolean): SecurityDetails {
    const user = new SecurityDetails(loginStatus.logged);

    // Try to get permissions from token
    if (loginStatus.token) {
      user.token = loginStatus.token;
      const tokenData: TokenData | null = this.jwtHelper.decodeToken(loginStatus.token);
      if (tokenData) {
        if (tokenData.sub) {
          user.username = tokenData.sub;
        }
        if (tokenData.permissions) {
          user.permissions = tokenData.permissions;
        }
      }
    }

    this.detailsSubject.next(user);

    if (store) {
      // Store user status in the local storage
      // This allows getting them back on a page reload
      localStorage.setItem(this.detailsKey, JSON.stringify(user));
    } else {
      // Remember me disabled
      // Remove stored details
      localStorage.removeItem(this.detailsKey);
    }

    return user;
  }

  /**
   * Checks if the current security details contains the received permission.
   * 
   * @param resource permission resource
   * @param action permission action
   * @returns true if the security details contains the permission, false otherwise
   */
  public hasPermission(resource: string, action: string): boolean {
    let hasPermission;

    const permissions = this.details.permissions;
    if (permissions) {
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

  /**
   * Reads the security details from the local storage.
   * 
   * @returns the user stored in the local storage
   */
  private loadDetailsFromLocal() {
    // If the user was stored, load it
    const localUser = localStorage.getItem(this.detailsKey);

    if (localUser) {
      // User found in local storage
      const readUser = JSON.parse(localUser);
      this.detailsSubject.next(readUser);
    } else {
      // User not found
      // Use default user
      this.detailsSubject.next(new SecurityDetails(false));
    }
  }

  /**
   * Checks if the token is expired. And if it is expired, then it replaces the current security details
   * for the default ones.
   */
  private checkTokenExpired() {
    const token = this.getToken();

    if ((token) && (this.jwtHelper.isTokenExpired(token))) {
      // Token expired 
      // Use default user
      this.detailsSubject.next(new SecurityDetails(false));
    }
  }

}
