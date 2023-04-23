import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SecurityStatus } from '../models/security-status';

/**
 * Security details container.
 */
@Injectable({
  providedIn: 'root',
})
export class SecurityContainer {

  /**
   * User key for storing user status into the local storage.
   */
  private userKey = 'user';

  /**
   * Subject with the user status.
   */
  private statusSubject: BehaviorSubject<SecurityStatus>;

  constructor(
  ) {
    this.statusSubject = this.readStatusFromLocal();
  }

  /**
   * Clears out the authentication status. In practice this will log out the user in session.
   */
  public reset() {
    // Replace local data with empty user status
    this.statusSubject.next(new SecurityStatus());

    // Clear local storage
    localStorage.removeItem(this.userKey);
  }

  /**
   * Returns the user status for the user currently in session.
   * @returns the user currently in session
   */
  public getStatus(): SecurityStatus {
    return this.statusSubject.value;
  }

  /**
   * Returns the user status for the user currently in session as an observable. This allows reacting to new logins or logouts.
   * 
   * @returns the user status for the user currently in session as an observable
   */
  public getStatusObservable(): Observable<SecurityStatus> {
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

  /**
   * Reads the login status from the local storage. This allows recovering users stored as part of
   * the 'remember me' functionality.
   * 
   * @returns the user stored in the local storage as part of the 'remember me'
   */
  private readStatusFromLocal(): BehaviorSubject<SecurityStatus> {
    let subject: BehaviorSubject<SecurityStatus>;

    // If the user was stored, load it
    const localUser = localStorage.getItem(this.userKey);
    if (localUser) {
      // User found in local storage
      const readUser = JSON.parse(localUser);
      subject = new BehaviorSubject<SecurityStatus>(readUser);
    } else {
      // User not found
      // Use default user
      subject = new BehaviorSubject<SecurityStatus>(new SecurityStatus());
    }

    return subject;
  }

}
