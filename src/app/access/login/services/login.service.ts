import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { LoginStatus } from '@app/core/authentication/models/login-status';
import { SecurityDetails } from '@app/core/authentication/models/security-details';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { UserLogin } from '../models/user-login';

@Injectable()
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

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/login');
  }

}
