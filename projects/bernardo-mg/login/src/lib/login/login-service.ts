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
   * Logs in a user. This requires sending a login request. If the request fails it returns an
   * empty login details object, otherwise it returns the login details received from the API.
   * 
   * If the 'remember me' flag is active, the user will be stored in the local storage.
   * 
   * @param request login request
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
