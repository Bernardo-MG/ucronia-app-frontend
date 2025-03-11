import { Injectable } from '@angular/core';
import { Fee } from '@app/models/fees/fee';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SortingDirection, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class MyFeesService {

  private readonly client;

  constructor(
    clientProvider: AngularCrudClientProvider
  ) {
    this.client = clientProvider.url(environment.apiUrl + '/user/fee');
  }

  public getAll(page: number): Observable<PaginatedResponse<Fee>> {
    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortingProperty('date', SortingDirection.Descending)]))
      .read<PaginatedResponse<Fee>>();
  }

}
