import { Injectable, inject } from '@angular/core';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { LoginRegister, SecurityClient } from '@bernardo-mg/security';
import { mergeProperties } from '@ucronia/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AccessAuditLoginService {

  private securityClient = inject(SecurityClient);

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<LoginRegister>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [
          new SortingProperty('date', SortingDirection.Descending)
        ]
      )
    );

    return this.securityClient.login.register.page(page, undefined, sorting);
  }

}
