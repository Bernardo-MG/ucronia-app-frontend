import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, ReplaySubject } from 'rxjs';
import { LoginStatus } from '../models/login-status';
import { PermissionList } from '../models/permission-list';
import { SecurityDetails } from '../models/security-details';
import { TokenData } from '../models/token-data';

/**
 * Manages authentication details, including security tokens and permissions.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthContainer {

  /**
   * Key for storing security details in the local storage.
   */
  private readonly detailsKey = 'securityDetails';

  /**
   * Subject to track security details changes.
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
  public get token(): string {
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
    this.detailsSubject.subscribe((s) => (this.details = s));
    this.loadDetailsFromLocal();
    this.checkTokenExpiration();
  }

  /**
   * Logs out the user by clearing stored security details.
   */
  public logout(): void {
    this.detailsSubject.next(new SecurityDetails(false));
    localStorage.removeItem(this.detailsKey);
  }

  /**
   * Stores security details and optionally persists them.
   *
   * @param loginStatus login status details
   * @param store whether to store details in local storage
   */
  public setDetails(loginStatus: LoginStatus, store: boolean): SecurityDetails {
    const newDetails = new SecurityDetails(loginStatus.logged);

    if (loginStatus.token) {
      newDetails.token = loginStatus.token;
      const tokenData: TokenData | null = this.jwtHelper.decodeToken(loginStatus.token);
      
      if (tokenData) {
        newDetails.username = tokenData.sub || '';
        newDetails.permissions = tokenData.permissions || new PermissionList();
      }
    }

    this.detailsSubject.next(newDetails);
    
    if (store) {
      localStorage.setItem(this.detailsKey, JSON.stringify(newDetails));
    } else {
      localStorage.removeItem(this.detailsKey);
    }

    return newDetails;
  }

  /**
   * Checks if the user has the required permission.
   *
   * @param resource permission resource
   * @param action permission action
   */
  public hasPermission(resource: string, action: string): boolean {
    return this.details.containsPermission(resource, action);
  }

  /**
   * Loads stored security details from local storage.
   */
  private loadDetailsFromLocal(): void {
    const localDetails = localStorage.getItem(this.detailsKey);
    
    if (localDetails) {
      this.detailsSubject.next(JSON.parse(localDetails));
    } else {
      this.detailsSubject.next(new SecurityDetails(false));
    }
  }

  /**
   * Checks if the token is expired and logs out the user if necessary.
   */
  private checkTokenExpiration(): void {
    if (this.token && this.jwtHelper.isTokenExpired(this.token)) {
      this.logout();
    }
  }
}
