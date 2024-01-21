import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTokenStatus } from '@app/access/models/user-token-status';
import { ApiResponse } from '@app/core/api/models/api-response';
import { AngularErrorRequestInterceptor } from '@app/core/api/request/angular-error-request-interceptor';
import { environment } from 'environments/environment';
import { Observable, catchError } from 'rxjs';
import { PasswordReset } from '../models/password-reset';
import { PasswordResetRequest } from '../models/password-reset-request';

@Injectable()
export class PasswordResetService {

  private passwordResetRequestUrl = environment.apiUrl + "/password/reset";

  private errorInteceptor = new AngularErrorRequestInterceptor();

  constructor(
    private http: HttpClient
  ) { }

  public requestResetPassword(request: PasswordResetRequest): Observable<ApiResponse<void>> {
    return this.http
      // Reset password request
      .post<ApiResponse<void>>(this.passwordResetRequestUrl, request)
      .pipe(
        catchError(this.errorInteceptor.handle)
      );;
  }

  public resetPassword(token: string, reset: PasswordReset): Observable<ApiResponse<void>> {
    return this.http
      // Validate token request
      .post<ApiResponse<void>>(`${this.passwordResetRequestUrl}/${token}`, reset)
      .pipe(
        catchError(this.errorInteceptor.handle)
      );;
  }

  public validateToken(token: string): Observable<ApiResponse<UserTokenStatus>> {
    return this.http
      // Validate token request
      .get<ApiResponse<UserTokenStatus>>(`${this.passwordResetRequestUrl}/${token}`)
      .pipe(
        catchError(this.errorInteceptor.handle)
      );;
  }

}
