/**
 * Status after a login attempt.
 */
export class LoginStatus {
    /**
     * User username.
     */
    username: string = '';
    /**
     * Logged in flag. If it is true, then the user is logged in.
     */
    successful: boolean = false;
    /**
     * Authentication token for the user. Only generated on a succesful login.
     */
    token?: string;
}