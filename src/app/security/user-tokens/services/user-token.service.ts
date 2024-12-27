import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginationParams } from '@app/core/api/client/pagination-params';
import { SortingParams } from '@app/core/api/client/sorting-params';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortDirection } from '@app/core/api/models/sort-direction';
import { SortProperty } from '@app/core/api/models/sort-field';
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
    const sorting = new SortingParams(
      sort.properties,
      [new SortProperty('creationDate', SortDirection.Descending), new SortProperty('username')]
    );

    return this.getClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read<PaginatedResponse<UserToken[]>>();
  }

  public getOne(token: string): Observable<UserToken> {
    return this.getClient()
      .appendRoute(`/${token}`)
      .read<SimpleResponse<UserToken>>()
      .pipe(map(r => r.content));
  }

  public patch(token: string, data: UserToken): Observable<UserToken> {
    return this.getClient()
      .appendRoute(`/${token}`)
      .patch<SimpleResponse<UserToken>>(data)
      .pipe(map(r => r.content));
  }

  public revoke(token: string): Observable<UserToken> {
    return this.getClient()
      .appendRoute(`/${token}`)
      .patch<SimpleResponse<UserToken>>({ revoked: true })
      .pipe(map(r => r.content));
  }

  public extend(token: string, date: string): Observable<UserToken> {
    return this.getClient()
      .appendRoute(`/${token}`)
      .patch<SimpleResponse<UserToken>>({ expirationDate: date })
      .pipe(map(r => r.content));
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/security/user/token');
  }

}
