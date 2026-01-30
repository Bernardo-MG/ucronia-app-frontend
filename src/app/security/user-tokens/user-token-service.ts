import { Injectable, inject } from '@angular/core';
import { UserToken } from '@bernardo-mg/authentication';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { SecurityClient } from '@bernardo-mg/security';
import { mergeProperties } from '@ucronia/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTokenService {

  private readonly securityClient = inject(SecurityClient);

  public getAll(page: number | undefined = undefined, sort: Sorting): Observable<PaginatedResponse<UserToken>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [
          new SortingProperty('creationDate', SortingDirection.Descending),
          new SortingProperty('username')
        ]
      )
    );

    return this.securityClient.userToken.page(page, undefined, sorting);
  }

  public getOne(token: string): Observable<UserToken> {
    return this.securityClient.userToken.get(token);
  }

  public revoke(token: string): Observable<UserToken> {
    return this.securityClient.userToken.patch(
      token,
      {
        revoked: true,
        expirationDate: undefined
      }
    );
  }

  public extend(token: string, date: Date): Observable<UserToken> {
    return this.securityClient.userToken.patch(
      token,
      {
        revoked: undefined,
        expirationDate: date
      }
    );
  }

}
