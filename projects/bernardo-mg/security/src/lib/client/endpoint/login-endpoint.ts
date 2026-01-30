import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginStatus } from '@bernardo-mg/authentication';
import { PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { catchError, map, Observable } from 'rxjs';
import { LoginRegister } from '../../domain/login-register';
import { LoginRequest } from '../../request/login-request';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class LoginEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  private readonly loginRegisterEndpoint;

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) {
    this.loginRegisterEndpoint = new LoginRegisterEndpoint(http, apiUrl);
  }

  public get register() {
    return this.loginRegisterEndpoint;
  }

  public login(request: LoginRequest): Observable<LoginStatus> {
    return this.http
      .post<SimpleResponse<LoginStatus>>(`${this.apiUrl}/login`, request)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}

export class LoginRegisterEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined,
    name: string | undefined = undefined
  ): Observable<PaginatedResponse<LoginRegister>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    if (name) {
      params = params.append('name', name);
    }

    return this.http.get<PaginatedResponse<LoginRegister>>(`${this.apiUrl}/security/login/register`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

}