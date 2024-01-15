import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTokenApi } from '@app/access/api/user-token-api';
import { Direction } from '@app/core/api/models/direction';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { UserToken } from '@app/core/authentication/models/user-token';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTokenService {

  private userTokenApi = new UserTokenApi(this.http);

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

    return this.userTokenApi.readAll(query);
  }

  public getOne(token: string): Observable<UserToken> {
    return this.userTokenApi.readById(token).pipe(map(r => r.content));
  }

  public patch(token: string, data: UserToken): Observable<UserToken> {
    return this.userTokenApi.patchById(token, data).pipe(map(r => r.content));
  }

  public revoke(token: string): Observable<UserToken> {
    return this.userTokenApi.patchById(token, { revoked: true }).pipe(map(r => r.content));
  }

  public extend(token: string, date: string): Observable<UserToken> {
    return this.userTokenApi.patchById(token, { expirationDate: date }).pipe(map(r => r.content));
  }

}
