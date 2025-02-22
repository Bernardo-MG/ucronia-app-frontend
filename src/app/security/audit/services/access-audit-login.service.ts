import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularCrudClient, CrudClient, PaginatedResponse, PaginationParams, Sorting, SortingDirection, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LoginRegister } from '../models/login-register';

@Injectable({
  providedIn: "root"
})
export class AccessAuditLoginService {

  constructor(
    private http: HttpClient
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
    return new AngularCrudClient(this.http, environment.apiUrl + '/security/login/register');
  }

}
