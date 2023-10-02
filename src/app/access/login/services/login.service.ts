import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { SecurityDetails } from '@app/core/authentication/models/security-status';
import { AuhtContainer } from '@app/core/authentication/services/auth.service';
import { environment } from 'environments/environment';
import { map, Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request';

@Injectable()
export class LoginService {

  /**
   * Login endpoint URL.
   */
  private loginUrl = environment.apiUrl + "/login";

  constructor(
    private http: HttpClient,
    private authContainer: AuhtContainer
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
  public login(request: LoginRequest, rememberMe: boolean): Observable<SecurityDetails> {
    return this.http
      // Login request
      .post<ApiResponse<SecurityDetails>>(this.loginUrl, request)
      // Get content
      .pipe(map(response => response.content))
      .pipe(tap(user => {
        // Succesful request

        // Save token
        this.authContainer.setDetails(user, rememberMe);
      }));
  }

}
