/**
 * Status after a login attempt.
 */
export class UserStatus {
    /**
     * User username.
     */
    username: string = '';
    /**
     * Logged in flag. If it is true, then the user is logged in.
     */
    logged: boolean = false;
    /**
     * Authentication token for the user. Only generated on a succesful login.
     */
    token?: string;
}