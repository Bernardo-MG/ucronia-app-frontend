
/**
 * Login status.
 */
export class LoginStatus {
  /**
   * Logged in flag. If it is true, then the user is logged in.
   */
  logged = false;
  /**
   * Authentication token for the user.
   */
  token?: string;
}