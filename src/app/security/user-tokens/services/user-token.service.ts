import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserToken } from '@bernardo-mg/authentication';
import { AngularCrudClient, CrudClient, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingDirection, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTokenService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<UserToken>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('creationDate', SortingDirection.Descending), new SortingProperty('username')]
    );

    return this.getClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read<PaginatedResponse<UserToken>>();
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

  private getClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/security/user/token');
  }

}
