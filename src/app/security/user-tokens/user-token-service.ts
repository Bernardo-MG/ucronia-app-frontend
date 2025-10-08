import { Injectable, inject } from '@angular/core';
import { UserToken } from '@bernardo-mg/authentication';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingDirection, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTokenService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/security/user/token');
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<UserToken>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('creationDate', SortingDirection.Descending), new SortingProperty('username')]
    );

    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read<PaginatedResponse<UserToken>>();
  }

  public getOne(token: string): Observable<UserToken> {
    return this.client
      .appendRoute(`/${token}`)
      .read<SimpleResponse<UserToken>>()
      .pipe(map(r => r.content));
  }

  public patch(token: string, data: UserToken): Observable<UserToken> {
    return this.client
      .appendRoute(`/${token}`)
      .patch<SimpleResponse<UserToken>>(data)
      .pipe(map(r => r.content));
  }

  public revoke(token: string): Observable<UserToken> {
    return this.client
      .appendRoute(`/${token}`)
      .patch<SimpleResponse<UserToken>>({ revoked: true })
      .pipe(map(r => r.content));
  }

  public extend(token: string, date: Date): Observable<UserToken> {
    return this.client
      .appendRoute(`/${token}`)
      .patch<SimpleResponse<UserToken>>({ expirationDate: date })
      .pipe(map(r => r.content));
  }

}
