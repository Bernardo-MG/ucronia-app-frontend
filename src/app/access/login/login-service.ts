import { inject, Injectable } from '@angular/core';
import { AuthContainer, LoginStatus, SecurityDetails } from '@bernardo-mg/authentication';
import { AngularCrudClientProvider, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { LoginRequest } from './models/login-request';

@Injectable({
  providedIn: "root"
})
export class LoginService {

  private authContainer = inject(AuthContainer);

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

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
  public login(request: LoginRequest, rememberMe: boolean): Observable<SecurityDetails> {
    return this.client
      .create<SimpleResponse<LoginStatus>>(request)
      .pipe(map(response => response.content))
      .pipe(map(loginStatus => {
        return this.authContainer.setDetails(loginStatus, rememberMe);
      }));
  }

}
