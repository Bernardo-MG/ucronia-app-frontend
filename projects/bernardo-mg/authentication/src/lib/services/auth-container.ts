import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, ReplaySubject } from 'rxjs';
import { LoginStatus } from '../models/login-status';
import { SecurityDetails } from '../models/security-details';
import { TokenData } from '../models/token-data';

/**
 * Contains the security details, to be watched or updated.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthContainer {

  /**
   * Security details key for storing security details into the local storage.
   */
  private detailsKey = 'securityDetails';

  /**
   * Subject with the security details. Allows reacting to changes.
   */
  private detailsSubject = new ReplaySubject<SecurityDetails>(1);

  private jwtHelper = new JwtHelperService();

  /**
   * Replicates the security details to ease consulting.
   * 
   * Can't be acquired directly, to avoid modification.
   */
  private details = new SecurityDetails(false);

  /**
   * Returns the security details for the user currently in session as an observable. This allows reacting to new logins or logouts.
   *
   * @returns the security details for the user currently in session as an observable
   */
  public get securityDetails(): Observable<SecurityDetails> {
    return this.detailsSubject.asObservable();
  }

  /**
   * Returns the security token for the user currently in session.
   * 
   * @returns the current user security token
   */
  public get token(): string | undefined {
    return this.details.token;
  }

  /**
   * Returns if the current user is logged in.
   * 
   * @returns if the current user is logged in
   */
  public get logged(): boolean {
    return this.details.logged;
  }

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
   * Clears out the authentication status, logging out the security details in session.
   */
  public logout() {
    // Replace local data with empty security details
    this.detailsSubject.next(new SecurityDetails(false));

    // Clear local storage
    localStorage.removeItem(this.detailsKey);
  }

  /**
   * Stores the received security details. If the store flag is set, then this will be kept in the
   * local storage, to keep the session alive when reloading.
   *
   * @param details security details to store
   * @param store keep the details in the local storage
   */
  public setDetails(loginStatus: LoginStatus, store: boolean): SecurityDetails {
    const newDetails = new SecurityDetails(loginStatus.logged);

    // Try to get permissions from token
    if (loginStatus.token) {
      newDetails.token = loginStatus.token;
      const tokenData: TokenData | null = this.jwtHelper.decodeToken(loginStatus.token);
      if (tokenData) {
        if (tokenData.sub) {
          newDetails.username = tokenData.sub;
        }
        if (tokenData.permissions) {
          newDetails.permissions = tokenData.permissions;
        }
      }
    }

    this.detailsSubject.next(newDetails);

    if (store) {
      // Store security details in the local storage
      // This allows getting them back on a page reload
      localStorage.setItem(this.detailsKey, JSON.stringify(newDetails));
    } else {
      // Remember me disabled
      // Remove stored details
      localStorage.removeItem(this.detailsKey);
    }

    return newDetails;
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

    if (this.details.permissions) {
      const key = resource;
      if (key in this.details.permissions) {
        hasPermission = this.details.permissions[key].includes(action);
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
   * @returns the security details stored in the local storage
   */
  private loadDetailsFromLocal() {
    // If the security details were stored, load them
    const localDetails = localStorage.getItem(this.detailsKey);

    if (localDetails) {
      // Security details found in local storage
      const readDetails = JSON.parse(localDetails);
      this.detailsSubject.next(readDetails);
    } else {
      // Security details not found
      // Use default details
      this.detailsSubject.next(new SecurityDetails(false));
    }
  }

  /**
   * Checks if the token is expired. And if it is expired, then it replaces the current security details
   * for the default ones.
   */
  private checkTokenExpired() {
    if ((this.token) && (this.jwtHelper.isTokenExpired(this.token))) {
      // Token expired
      // Use default security details
      this.detailsSubject.next(new SecurityDetails(false));
    }
  }

}
