import { HttpClient } from '@angular/common/http';
import { UserTokenStatus } from '@bernardo-mg/authentication';
import { SimpleResponse } from '@bernardo-mg/request';
import { catchError, Observable } from 'rxjs';
import { PasswordReset } from '../../password/password-reset';
import { PasswordResetRequest } from '../../password/password-reset-request';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class PasswordEndpoint {

  private readonly passwordResetEndpoint;

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) {
    this.passwordResetEndpoint = new PasswordResetEndpoint(http, apiUrl);
  }

  public get reset() {
    return this.passwordResetEndpoint;
  }

}

export class PasswordResetEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public requestReset(request: PasswordResetRequest): Observable<SimpleResponse<void>> {
    return this.http
      .post<SimpleResponse<void>>(`${this.apiUrl}/password/reset`, request)
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public reset(token: string, reset: PasswordReset): Observable<SimpleResponse<void>> {
    return this.http
      .post<SimpleResponse<void>>(`${this.apiUrl}/password/reset/${token}`, reset)
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public validateToken(token: string): Observable<SimpleResponse<UserTokenStatus>> {
    return this.http
      .get<SimpleResponse<UserTokenStatus>>(`${this.apiUrl}/password/reset/${token}`)
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

}