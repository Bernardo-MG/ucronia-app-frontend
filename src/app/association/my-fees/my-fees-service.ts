import { inject, Injectable } from '@angular/core';
import { Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { SecurityClient } from '@bernardo-mg/security';
import { UcroniaClient } from '@ucronia/api';
import { Fee } from '@ucronia/domain';
import { defaultIfEmpty, map, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class MyFeesService {

  private readonly ucroniaClient = inject(UcroniaClient);
  private readonly securityClient = inject(SecurityClient);

  public getAll(page: number | undefined = undefined): Observable<Page<Fee>> {
    const sorting = new Sorting(
      [
        new SortingProperty('month', SortingDirection.Descending)
      ]
    );

    return this.ucroniaClient.myFees.page(page, undefined, sorting);
  }

  public hasFees(): Observable<boolean> {
    return this.securityClient.account.get().pipe(
      map(() => true),
      defaultIfEmpty(false)
    );
  }

}
