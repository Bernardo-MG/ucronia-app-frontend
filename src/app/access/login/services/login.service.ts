import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { SecurityStatus } from '@app/core/authentication/models/security-status';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';

@Injectable()
export class LoginService {

  /**
   * Login endpoint URL.
   */
  private loginUrl = environment.apiUrl + "/login";

  constructor(
    private http: HttpClient
  ) { }
  
  public probe(): Observable<Object> {
    return this.http.options(this.loginUrl);
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
  public login(request: LoginRequest): Observable<SecurityStatus> {
    return this.http
      // Login request
      .post<ApiResponse<SecurityStatus>>(this.loginUrl, request)
      // Get content
      .pipe(map(response => response.content));
  }

}
