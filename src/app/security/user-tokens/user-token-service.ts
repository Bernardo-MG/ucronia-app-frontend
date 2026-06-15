import { Injectable, inject } from '@angular/core';
import { UserToken } from '@bernardo-mg/authentication';
import { Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { SecurityClient } from '@bernardo-mg/security';
import { mergeProperties } from '@ucronia/api';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTokenService {

  private readonly securityClient = inject(SecurityClient);
  private readonly messageService = inject(MessageService);

  public getAll(page: number | undefined = undefined, sort: Sorting): Observable<Page<UserToken>> {
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
    // TODO: is this not being used?
    return this.securityClient.userToken.patch(
      token,
      {
        revoked: true,
        expirationDate: undefined
      }
    )
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Actualizado',
            detail: 'Datos actualizados',
            life: 3000
          });
        })
      );
  }

  public extend(token: string, date: Date): Observable<UserToken> {
    return this.securityClient.userToken.patch(
      token,
      {
        revoked: undefined,
        expirationDate: date
      }
    )
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Actualizado',
            detail: 'Datos actualizados',
            life: 3000
          });
        })
      );
  }

}
