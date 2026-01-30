import { HttpClient, HttpParams } from '@angular/common/http';
import { User, UserTokenStatus } from '@bernardo-mg/authentication';
import { PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { catchError, map, Observable } from 'rxjs';
import { Profile } from '../../profile/profile';
import { UserActivation } from '../../user/user-activation';
import { UserCreation } from '../../user/user-creation';
import { UserUpdate } from '../../user/user-update';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class UserEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  private readonly userOnboardingEndpoint;
  private readonly userProfileEndpoint;

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) {
    this.userOnboardingEndpoint = new UserOnboardingEndpoint(http, apiUrl);
    this.userProfileEndpoint = new UserProfileEndpoint(http, apiUrl);
  }

  public get onboarding() {
    return this.userOnboardingEndpoint;
  }

  public get profile() {
    return this.userProfileEndpoint;
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

  public invite(
    data: UserCreation
  ): Observable<User> {
    return this.http.post<SimpleResponse<User>>(`${this.apiUrl}/security/user/onboarding/invite`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}

export class UserProfileEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public get(
    username: string
  ): Observable<Profile> {
    return this.http.get<SimpleResponse<Profile>>(`${this.apiUrl}/security/user/${username}/profile`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public set(
    username: string,
    profile: number
  ): Observable<Profile> {
    return this.http.post<SimpleResponse<Profile>>(`${this.apiUrl}/security/user/${username}/profile/${profile}`, null)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}