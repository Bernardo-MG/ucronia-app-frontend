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
    const defaultSort = new Sort<UserToken>('username');
    defaultSort.direction = Direction.Ascending;

    const query = new PaginatedQuery<UserToken>();
    query.defaultSort = [defaultSort];
    query.pagination = pagination;

    return this.userTokenApi.readAll(query);
  }

  public getOne(tokenId: number): Observable<UserToken> {
    return this.userTokenApi.readById(tokenId).pipe(map(r => r.content));
  }

  public patch(tokenId: number, data: UserToken): Observable<UserToken> {
    return this.userTokenApi.patchById(tokenId, data).pipe(map(r => r.content));
  }

  public revoke(tokenId: number): Observable<UserToken> {
    return this.userTokenApi.patchById(tokenId, { revoked: true }).pipe(map(r => r.content));
  }

  public extend(tokenId: number, date: string): Observable<UserToken> {
    return this.userTokenApi.patchById(tokenId, { expirationDate: date }).pipe(map(r => r.content));
  }

}
