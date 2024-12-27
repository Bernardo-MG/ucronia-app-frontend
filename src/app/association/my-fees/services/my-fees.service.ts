import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationParams } from '@app/core/api/models/pagination-params';
import { SortDirection } from '@app/core/api/models/sort-direction';
import { SortProperty } from '@app/core/api/models/sort-field';
import { SortingParams } from '@app/core/api/models/sorting-params';
import { Fee } from '@app/models/fees/fee';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class MyFeesService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(page: number): Observable<PaginatedResponse<Fee[]>> {
    return this.getClient()
      .parameters(new PaginationParams(page))
      .parameters(new SortingParams([new SortProperty('date', SortDirection.Descending)]))
      .read<PaginatedResponse<Fee[]>>();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/user/fee');
  }

}
