
/**
 * Security details for a user.
 */
export class SecurityDetails {
  /**
   * User username.
   */
  username = '';
  /**
   * Logged in flag. If it is true, then the user is logged in.
   */
  logged = false;
  /**
   * Authentication token for the user.
   */
  token?: string;
  /**
   * User permissions.
   */
  permissions?: { [key: string]: string };
}