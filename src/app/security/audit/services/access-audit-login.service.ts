import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginationParams } from '@app/core/api/client/pagination-params';
import { SortingParams } from '@app/core/api/client/sorting-params';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortDirection } from '@app/core/api/models/sort-direction';
import { SortProperty } from '@app/core/api/models/sort-field';
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
