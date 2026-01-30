import { HttpClient, HttpParams } from '@angular/common/http';
import { User, UserTokenStatus } from '@bernardo-mg/authentication';
import { PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { catchError, map, Observable } from 'rxjs';
import { UserActivation } from '../../user/user-activation';
import { ErrorRequestInterceptor } from '../error-request-interceptor';
import { RoleChange } from '../../role/role-change';
import { RoleCreation } from '../../role/role-creation';
import { UserCreation } from '../../user/user-creation';
import { UserUpdate } from '../../user/user-update';

export class UserEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

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

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined
  ): Observable<PaginatedResponse<User>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    params = params.append('status', status);

    return this.http.get<PaginatedResponse<User>>(`${this.apiUrl}/security/user`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(
    username: string
  ): Observable<User> {
    return this.http.get<SimpleResponse<User>>(`${this.apiUrl}/security/user/${username}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public create(
    data: UserCreation
  ): Observable<User> {
    return this.http.post<SimpleResponse<User>>(`${this.apiUrl}/security/user`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(
    username: string,
    data: UserUpdate
  ): Observable<User> {
    return this.http.patch<SimpleResponse<User>>(`${this.apiUrl}/security/user/${username}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(
    username: string
  ): Observable<User> {
    return this.http.delete<SimpleResponse<User>>(`${this.apiUrl}/security/user/${username}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
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