import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortDirection } from '@app/core/api/models/sort-direction';
import { SortField } from '@app/core/api/models/sort-field';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LoginRegister } from '../models/login-register';

@Injectable()
export class AccessAuditLoginService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(page: number, sort: Sort): Observable<PaginatedResponse<LoginRegister[]>> {
    const defaultSort = new SortField('date');
    defaultSort.direction = SortDirection.Ascending;

    const query = new PaginatedQuery();
    query.defaultSort = new Sort([defaultSort]);
    query.pagination = { page };
    query.sort = sort;

    return this.getClient()
      .query(query)
      .read();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/security/login/register');
  }

}
