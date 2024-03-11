import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/core/api/models/api-response';
import { Direction } from '@app/core/api/models/direction';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
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

  public getAll(page: number, sort: Sort): Observable<PaginatedResponse<UserToken[]>> {
    const sortDate = new SortField('creationDate');
    sortDate.direction = Direction.Descending;
    const sortUsername = new SortField('username');
    sortUsername.direction = Direction.Ascending;

    const query = new PaginatedQuery();
    query.defaultSort = new Sort([sortDate, sortUsername]);
    query.pagination = { page };
    query.sort = sort;

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
