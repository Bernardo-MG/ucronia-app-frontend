/**
 * Status after a login attempt.
 */
export class LoginStatus {
    /**
     * User username.
     */
    username = '';
    /**
     * Logged in flag. If it is true, then the user is logged in.
     */
    successful = false;
    /**
     * Authentication token for the user. Only generated on a succesful login.
     */
    token?: string;
}