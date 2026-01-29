import { HttpClient } from '@angular/common/http';
import { LoginStatus } from '@bernardo-mg/authentication';
import { SimpleResponse } from '@bernardo-mg/request';
import { catchError, map, Observable } from 'rxjs';
import { LoginRequest } from '../../login/login-request';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class LoginEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public login(request: LoginRequest): Observable<LoginStatus> {
    return this.http
      .post<SimpleResponse<LoginStatus>>(`${this.apiUrl}/login`, request)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}