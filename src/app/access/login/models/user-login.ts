/**
 * User login. Used to attempt a login, for this reason it contains the user credentials.
 */
export class UserLogin {
  /**
   * Username for the login attempt.
   */
  username = '';
  /**
   * password for the login attempt.
   */
  password = '';

  constructor(username: string | undefined, password: string | undefined) {
    if (username) {
      this.username = username;
    }
    if (password) {
      this.password = password;
    }
  }

}