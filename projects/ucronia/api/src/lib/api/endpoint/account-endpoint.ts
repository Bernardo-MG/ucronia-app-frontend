import { HttpClient } from '@angular/common/http';
import { ErrorRequestInterceptor, SimpleResponse } from '@bernardo-mg/request';
import { Profile } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';

export class AccountEndpoint {

  private readonly userProfileEndpoint;

  public constructor(
    http: HttpClient,
    apiUrl: string
  ) {
    this.userProfileEndpoint = new AccountProfileEndpoint(http, apiUrl);
  }

  public get profile() {
    return this.userProfileEndpoint;
  }

}

export class AccountProfileEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public get(): Observable<Profile> {
    return this.http.get<SimpleResponse<Profile>>(`${this.apiUrl}/account/profile`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}