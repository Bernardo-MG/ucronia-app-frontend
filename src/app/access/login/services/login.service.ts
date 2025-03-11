import { Injectable } from '@angular/core';
import { AuthContainer, LoginStatus, SecurityDetails } from '@bernardo-mg/authentication';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { UserLogin } from '../models/user-login';

@Injectable({
  providedIn: "root"
})
export class LoginService {

  private readonly client;

  constructor(
    private authContainer: AuthContainer,
    clientProvider: AngularCrudClientProvider
  ) {
    this.client = clientProvider.url(environment.apiUrl + '/login');
  }

  /**
   * Logs in a user. This requires sending a login request. If the request fails it returns an
   * empty login details object, otherwise it returns the login details received from the API.
   * 
   * If the 'remember me' flag is active, the user will be stored in the local storage.
   * 
   * @param request login request
   * @returns the user resulting from the login
   */
  public login(request: UserLogin, rememberMe: boolean): Observable<SecurityDetails> {
    return this.client
      // Login request
      .create<SimpleResponse<LoginStatus>>(request)
      // Get content
      .pipe(map(response => response.content))
      .pipe(map(loginStatus => {
        // Succesful request

        // Save token
        return this.authContainer.setDetails(loginStatus, rememberMe);
      }));
  }

}
