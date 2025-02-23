import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthContainer, LoginStatus, SecurityDetails } from '@bernardo-mg/authentication';
import { AngularCrudClient, CrudClient, SimpleResponse } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { UserLogin } from '../models/user-login';

@Injectable({
  providedIn: "root"
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private authContainer: AuthContainer
  ) { }

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
    return this.getClient()
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

  private getClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/login');
  }

}
