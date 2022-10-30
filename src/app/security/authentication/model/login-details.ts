/**
 * User login details. Shows the status after a login attempt.
 */
export class LoginDetails {
    /**
     * User username.
     */
    username: string = '';
    /**
     * Logged in flag. If it is true, then the user is logged in.
     */
    logged: boolean = false;
    /**
     * Authentication token for the user.
     */
    token: string = '';
}