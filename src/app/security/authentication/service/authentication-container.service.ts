import { Injectable } from '@angular/core';
import { LoginStatus } from '@app/security/login/model/login-status';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationContainer {

  private userKey = 'user';

  private loginStatusSubject: BehaviorSubject<LoginStatus>;

  private loginStatus: Observable<LoginStatus>;

  constructor(
  ) {
    this.loginStatusSubject = this.readUserFromLocal();
    this.loginStatus = this.loginStatusSubject.asObservable();
  }

  /**
   * Reads the login status from the local storage. This allows recovering users stored as part of
   * the 'remember me' functionality.
   * 
   * @returns the user stored in the local storage as part of the 'remember me'
   */
  private readUserFromLocal(): BehaviorSubject<LoginStatus> {
    let subject: BehaviorSubject<LoginStatus>;

    // If the user was stored, load it
    const localUser = localStorage.getItem(this.userKey);
    if (localUser) {
      // User found in local storage
      const readUser = JSON.parse(localUser);
      subject = new BehaviorSubject<LoginStatus>(readUser);
    } else {
      // User not found
      // Use default user
      subject = new BehaviorSubject<LoginStatus>(new LoginStatus());
    }

    return subject;
  }

  /**
   * Logs out the current user.
   */
  public reset() {
    // Replace local data with empty login details
    this.loginStatusSubject.next(new LoginStatus());

    // Clear local storage
    localStorage.removeItem(this.userKey);
  }

  /**
   * Returns the login details for the user currently in session.
   * @returns the user currently in session
   */
  public getLoginStatus(): LoginStatus {
    return this.loginStatusSubject.value;
  }

  /**
   * Returns the login details for the user currently in session as an observable. This allows reacting to new logins or logouts.
   * 
   * @returns the login details for the user currently in session as an observable
   */
  public getUserObservable(): Observable<LoginStatus> {
    return this.loginStatus;
  }

  /**
   * Stores the received login details. This takes two steps, first it is stored in the local
   * subject. Then, if the 'remember me' option is enabled, it will be stored in the local storage.
   * 
   * @param loginStatus login details to store
   */
  public setLoginStatus(loginStatus: LoginStatus, rememberMe: Boolean) {
    this.loginStatusSubject.next(loginStatus);

    if (rememberMe) {
      // Store login details in the local storage
      // This allows getting them back on a page reload
      localStorage.setItem(this.userKey, JSON.stringify(loginStatus));
    }
  }

}
