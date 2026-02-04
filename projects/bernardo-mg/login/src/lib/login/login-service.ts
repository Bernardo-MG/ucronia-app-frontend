import { inject, Injectable } from '@angular/core';
import { AuthService, SecurityDetails } from '@bernardo-mg/authentication';
import { LoginRequest, SecurityClient } from '@bernardo-mg/security';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class LoginService {

  private readonly securityClient = inject(SecurityClient);

  private readonly authService = inject(AuthService);

  /**
   * Logs in a user. On success it stores the response as the auth details.
   * 
   * @param request login request
   * @param rememberMe remember me flag
   * @returns the user resulting from the login
   */
  public login(request: LoginRequest, rememberMe: boolean): Observable<SecurityDetails> {
    return this.securityClient.login.login(request)
      .pipe(map(loginStatus => {
        return this.authService.setDetails(
          loginStatus.logged,
          loginStatus.token ? loginStatus.token : '',
          rememberMe
        );
      }));
  }

}
