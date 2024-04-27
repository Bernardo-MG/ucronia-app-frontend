import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fee } from '@app/association/fees/models/fee';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortDirection } from '@app/core/api/models/sort-direction';
import { SortField } from '@app/core/api/models/sort-field';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UserFeeService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(page: number): Observable<PaginatedResponse<Fee[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortField('date', SortDirection.Descending)]);
    query.pagination = { page };

    return this.getClient()
      .query(query)
      .read<PaginatedResponse<Fee[]>>();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/user/fee');
  }

}
