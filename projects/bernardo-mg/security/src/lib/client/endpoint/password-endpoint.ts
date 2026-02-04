import { HttpClient } from '@angular/common/http';
import { UserTokenStatus } from '@bernardo-mg/authentication';
import { SimpleResponse } from '@bernardo-mg/request';
import { catchError, map, Observable } from 'rxjs';
import { PasswordChange } from '../../request/password-change';
import { PasswordReset } from '../../request/password-reset';
import { PasswordResetRequest } from '../../request/password-reset-request';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class PasswordEndpoint {

  private readonly passwordResetEndpoint;

  private readonly passwordChangeEndpoint;

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) {
    this.passwordResetEndpoint = new PasswordResetEndpoint(http, apiUrl);
    this.passwordChangeEndpoint = new PasswordChangeEndpoint(http, apiUrl);
  }

  public get reset() {
    return this.passwordResetEndpoint;
  }

  public get change() {
    return this.passwordChangeEndpoint;
  }

}

export class PasswordResetEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public requestReset(request: PasswordResetRequest): Observable<void> {
    return this.http
      .post<SimpleResponse<void>>(`${this.apiUrl}/password/reset`, request)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => r.content)
      );
  }

  public reset(token: string, reset: PasswordReset): Observable<void> {
    return this.http
      .post<SimpleResponse<void>>(`${this.apiUrl}/password/reset/${token}`, reset)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => r.content)
      );
  }

  public validateToken(token: string): Observable<UserTokenStatus> {
    return this.http
      .get<SimpleResponse<UserTokenStatus>>(`${this.apiUrl}/password/reset/${token}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => r.content)
      );
  }

}

export class PasswordChangeEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public change(request: PasswordChange): Observable<void> {
    return this.http
      .post<SimpleResponse<void>>(`${this.apiUrl}/password/change`, request)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => r.content)
      );
  }

}