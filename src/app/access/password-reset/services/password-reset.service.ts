import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTokenStatus } from '@app/access/models/user-token-status';
import { SimpleResponse } from '@app/core/api/models/simple-response';
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

  public requestResetPassword(request: PasswordResetRequest): Observable<SimpleResponse<void>> {
    return this.http
      // Reset password request
      .post<SimpleResponse<void>>(this.passwordResetRequestUrl, request)
      .pipe(
        catchError(this.errorInteceptor.handle)
      );
  }

  public resetPassword(token: string, reset: PasswordReset): Observable<SimpleResponse<void>> {
    return this.http
      // Validate token request
      .post<SimpleResponse<void>>(`${this.passwordResetRequestUrl}/${token}`, reset)
      .pipe(
        catchError(this.errorInteceptor.handle)
      );
  }

  public validateToken(token: string): Observable<SimpleResponse<UserTokenStatus>> {
    return this.http
      // Validate token request
      .get<SimpleResponse<UserTokenStatus>>(`${this.passwordResetRequestUrl}/${token}`)
      .pipe(
        catchError(this.errorInteceptor.handle)
      );
  }

}
