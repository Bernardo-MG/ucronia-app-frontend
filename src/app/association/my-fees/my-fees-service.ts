import { Injectable, inject } from '@angular/core';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SortingDirection, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { Fee } from "@ucronia/domain";
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class MyFeesService {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/user/fee');
  }

  public getAll(page: number | undefined = undefined): Observable<PaginatedResponse<Fee>> {
    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortingProperty('month', SortingDirection.Descending)]))
      .read<PaginatedResponse<Fee>>();
  }

}
