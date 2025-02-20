import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient, Client, PaginatedResponse, PaginationParams, Sort, SortDirection, SortingParams, SortProperty } from '@bernardo-mg/request';
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

  public getAll(page: number, sort: Sort): Observable<PaginatedResponse<LoginRegister[]>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortProperty('date', SortDirection.Descending)]
    );

    return this.getClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/security/login/register');
  }

}
