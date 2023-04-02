import { Injectable } from '@angular/core';
import { UserStatus } from '@app/core/authentication/models/user-status';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationContainer {

  private userKey = 'user';

  private userSubject: BehaviorSubject<UserStatus>;

  private user: Observable<UserStatus>;

  constructor(
  ) {
    this.userSubject = this.readUserFromLocal();
    this.user = this.userSubject.asObservable();
  }

  /**
   * Reads the login status from the local storage. This allows recovering users stored as part of
   * the 'remember me' functionality.
   * 
   * @returns the user stored in the local storage as part of the 'remember me'
   */
  private readUserFromLocal(): BehaviorSubject<UserStatus> {
    let subject: BehaviorSubject<UserStatus>;

    // If the user was stored, load it
    const localUser = localStorage.getItem(this.userKey);
    if (localUser) {
      // User found in local storage
      const readUser = JSON.parse(localUser);
      subject = new BehaviorSubject<UserStatus>(readUser);
    } else {
      // User not found
      // Use default user
      subject = new BehaviorSubject<UserStatus>(new UserStatus());
    }

    return subject;
  }

  /**
   * Logs out the current user.
   */
  public reset() {
    // Replace local data with empty login details
    this.userSubject.next(new UserStatus());

    // Clear local storage
    localStorage.removeItem(this.userKey);
  }

  /**
   * Returns the login details for the user currently in session.
   * @returns the user currently in session
   */
  public getUserStatus(): UserStatus {
    return this.userSubject.value;
  }

  /**
   * Returns the login details for the user currently in session as an observable. This allows reacting to new logins or logouts.
   * 
   * @returns the login details for the user currently in session as an observable
   */
  public getUserStatusObservable(): Observable<UserStatus> {
    return this.user;
  }

  /**
   * Stores the received login details. This takes two steps, first it is stored in the local
   * subject. Then, if the 'remember me' option is enabled, it will be stored in the local storage.
   * 
   * @param user login details to store
   */
  public setUserStatus(user: UserStatus, rememberMe: Boolean) {
    this.userSubject.next(user);

    if (rememberMe) {
      // Store login details in the local storage
      // This allows getting them back on a page reload
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

}
