import { HttpClient, HttpParams } from '@angular/common/http';
import { UserToken } from '@bernardo-mg/authentication';
import { Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { catchError, map, Observable } from 'rxjs';
import { UserTokenPatch } from '../../request/user-token-patch';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class UserTokenEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined
  ): Observable<Page<UserToken>> {
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

    return this.http.get<PaginatedResponse<UserToken>>(`${this.apiUrl}/security/user/token`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(
    token: string
  ): Observable<UserToken> {
    return this.http.get<SimpleResponse<UserToken>>(`${this.apiUrl}/security/user/token/${token}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public patch(
    token: string,
    data: UserTokenPatch
  ): Observable<UserToken> {
    return this.http.patch<SimpleResponse<UserToken>>(`${this.apiUrl}/security/user/token/${token}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}
