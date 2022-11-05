import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginDetails } from '../model/login-details';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationContainer {

  private userKey = 'user';

  private loginDetailsSubject: BehaviorSubject<LoginDetails>;

  private loginDetails: Observable<LoginDetails>;

  constructor(
  ) {
    this.loginDetailsSubject = this.readUserFromLocal();
    this.loginDetails = this.loginDetailsSubject.asObservable();
  }

  /**
   * Reads the login status from the local storage. This allows recovering users stored as part of
   * the 'remember me' functionality.
   * 
   * @returns the user stored in the local storage as part of the 'remember me'
   */
  private readUserFromLocal(): BehaviorSubject<LoginDetails> {
    let subject: BehaviorSubject<LoginDetails>;

    // If the user was stored, load it
    const localUser = localStorage.getItem(this.userKey);
    if (localUser) {
      // User found in local storage
      const readUser = JSON.parse(localUser);
      subject = new BehaviorSubject<LoginDetails>(readUser);
    } else {
      // User not found
      // Use default user
      subject = new BehaviorSubject<LoginDetails>(new LoginDetails());
    }

    return subject;
  }

  /**
   * Logs out the current user.
   */
  public reset() {
    // Replace local data with empty login details
    this.loginDetailsSubject.next(new LoginDetails());

    // Clear local storage
    localStorage.removeItem(this.userKey);
  }

  /**
   * Returns the login details for the user currently in session.
   * @returns the user currently in session
   */
  public getLoginDetails(): LoginDetails {
    return this.loginDetailsSubject.value;
  }

  /**
   * Returns the login details for the user currently in session as an observable. This allows reacting to new logins or logouts.
   * 
   * @returns the login details for the user currently in session as an observable
   */
  public getUserObservable(): Observable<LoginDetails> {
    return this.loginDetails;
  }

  /**
   * Stores the received login details. This takes two steps, first it is stored in the local
   * subject. Then, if the 'remember me' option is enabled, it will be stored in the local storage.
   * 
   * @param loginDetails login details to store
   */
  public setLoginDetails(loginDetails: LoginDetails, rememberMe: Boolean) {
    this.loginDetailsSubject.next(loginDetails);

    if (rememberMe) {
      // Store login details in the local storage
      // This allows getting them back on a page reload
      localStorage.setItem(this.userKey, JSON.stringify(loginDetails));
    }
  }

}
