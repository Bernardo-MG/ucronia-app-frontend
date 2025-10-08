
/**
 * Login status.
 */
export class LoginStatus {
  constructor(
    /**
     * Logged in flag. If it is true, then the user is logged in.
     */
    public logged = false,
    /**
     * Authentication token for the user.
     */
    public token?: string
  ) { }
}