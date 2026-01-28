import { Injectable, inject } from '@angular/core';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Fee } from "@ucronia/domain";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class MyFeesService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getAll(page: number | undefined = undefined): Observable<PaginatedResponse<Fee>> {
    const sorting = new Sorting(
      [
        new SortingProperty('month', SortingDirection.Descending)
      ]
    );

    return this.ucroniaClient.myFees.page(page, undefined, sorting);
  }

}
