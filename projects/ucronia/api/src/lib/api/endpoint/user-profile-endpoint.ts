import { HttpClient } from '@angular/common/http';
import { ErrorRequestInterceptor, SimpleResponse } from '@bernardo-mg/request';
import { Profile } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';

export class UserEndpoint {

  private readonly userProfileEndpoint;

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) {
    this.userProfileEndpoint = new UserProfileEndpoint(http, apiUrl);
  }

  public get profile() {
    return this.userProfileEndpoint;
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

  public delete(
    username: string
  ): Observable<Profile> {
    return this.http.delete<SimpleResponse<Profile>>(`${this.apiUrl}/security/user/${username}/profile`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}