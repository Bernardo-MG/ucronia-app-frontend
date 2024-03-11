import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { Direction } from '@app/core/api/models/direction';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { AngularRequest } from '@app/core/api/request/angular-request';
import { Request } from '@app/core/api/request/request';
import { UserToken } from '@app/core/authentication/models/user-token';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTokenService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(pagination: PaginationRequest | undefined): Observable<PaginatedResponse<UserToken[]>> {
    const sortDate = new Sort('creationDate');
    sortDate.direction = Direction.Descending;
    const sortUsername = new Sort('username');
    sortUsername.direction = Direction.Ascending;

    const query = new PaginatedQuery<UserToken>();
    query.defaultSort = [sortDate, sortUsername];
    query.pagination = pagination;

    return this.getRequest().query(query).read();
  }

  public getOne(token: string): Observable<UserToken> {
    return this.getRequest().appendRoute(`/${token}`).read<ApiResponse<UserToken>>().pipe(map(r => r.content));
  }

  public patch(token: string, data: UserToken): Observable<UserToken> {
    return this.getRequest().appendRoute(`/${token}`).patch<ApiResponse<UserToken>>(data).pipe(map(r => r.content));
  }

  public revoke(token: string): Observable<UserToken> {
    return this.getRequest().appendRoute(`/${token}`).patch<ApiResponse<UserToken>>({ revoked: true }).pipe(map(r => r.content));
  }

  public extend(token: string, date: string): Observable<UserToken> {
    return this.getRequest().appendRoute(`/${token}`).patch<ApiResponse<UserToken>>({ expirationDate: date }).pipe(map(r => r.content));
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/security/user/token');
  }

}
