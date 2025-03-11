import { Injectable } from '@angular/core';
import { AngularCrudClientProvider, CrudClient, PaginatedResponse, PaginationParams, Sorting, SortingDirection, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LoginRegister } from '../models/login-register';

@Injectable({
  providedIn: "root"
})
export class AccessAuditLoginService {

  constructor(
    private clientProvider: AngularCrudClientProvider
  ) { }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<LoginRegister>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('date', SortingDirection.Descending)]
    );

    return this.getClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  private getClient(): CrudClient {
    return this.clientProvider.url(environment.apiUrl + '/security/login/register');
  }

}
