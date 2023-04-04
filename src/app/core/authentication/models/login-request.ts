/**
 * User login request. Used to attempt a login, for this reason it contains the user credentials.
 */
export class LoginRequest {
    /**
     * Username for the login attempt.
     */
    username = '';
    /**
     * password for the login attempt.
     */
    password = '';
}