import { HttpClient } from '@angular/common/http';
import { User, UserTokenStatus } from '@bernardo-mg/authentication';
import { SimpleResponse } from '@bernardo-mg/request';
import { catchError, Observable } from 'rxjs';
import { UserActivation } from '../../user/user-activation';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class UserEndpoint {

  private readonly userOnboardingEndpoint;

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) {
    this.userOnboardingEndpoint = new UserOnboardingEndpoint(http, apiUrl);
  }

  public get onboarding() {
    return this.userOnboardingEndpoint;
  }

}

export class UserOnboardingEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public activate(token: string, activation: UserActivation): Observable<SimpleResponse<User>> {
    return this.http
      .post<SimpleResponse<User>>(`${this.apiUrl}/security/user/onboarding/activate/${token}`, activation)
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public validateToken(token: string): Observable<SimpleResponse<UserTokenStatus>> {
    return this.http
      .get<SimpleResponse<UserTokenStatus>>(`${this.apiUrl}/security/user/onboarding/activate/${token}`)
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

}