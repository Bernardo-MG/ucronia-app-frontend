import { Injectable } from '@angular/core';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, Sorting, SortingDirection, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LoginRegister } from '../models/login-register';

@Injectable({
  providedIn: "root"
})
export class AccessAuditLoginService {

  private client;

  constructor(
    private clientProvider: AngularCrudClientProvider
  ) {
    this.client = this.clientProvider.url(environment.apiUrl + '/security/login/register');
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<LoginRegister>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('date', SortingDirection.Descending)]
    );

    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

}
