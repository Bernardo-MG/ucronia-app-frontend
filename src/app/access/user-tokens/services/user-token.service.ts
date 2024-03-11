import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortDirection } from '@app/core/api/models/sort-direction';
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
    sortDate.direction = SortDirection.Descending;
    const sortUsername = new SortField('username');
    sortUsername.direction = SortDirection.Ascending;

    const query = new PaginatedQuery();
    query.defaultSort = new Sort([sortDate, sortUsername]);
    query.pagination = { page };
    query.sort = sort;

    return this.getRequest().query(query).read();
  }

  public getOne(token: string): Observable<UserToken> {
    return this.getRequest().appendRoute(`/${token}`).read<SimpleResponse<UserToken>>().pipe(map(r => r.content));
  }

  public patch(token: string, data: UserToken): Observable<UserToken> {
    return this.getRequest().appendRoute(`/${token}`).patch<SimpleResponse<UserToken>>(data).pipe(map(r => r.content));
  }

  public revoke(token: string): Observable<UserToken> {
    return this.getRequest().appendRoute(`/${token}`).patch<SimpleResponse<UserToken>>({ revoked: true }).pipe(map(r => r.content));
  }

  public extend(token: string, date: string): Observable<UserToken> {
    return this.getRequest().appendRoute(`/${token}`).patch<SimpleResponse<UserToken>>({ expirationDate: date }).pipe(map(r => r.content));
  }

  private getRequest(): Request {
    return new AngularRequest(this.http, environment.apiUrl + '/security/user/token');
  }

}
