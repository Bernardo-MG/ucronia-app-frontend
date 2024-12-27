import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginationParams } from '@app/core/api/client/pagination-params';
import { SortingParams } from '@app/core/api/client/sorting-params';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SortDirection } from '@app/core/api/models/sort-direction';
import { SortProperty } from '@app/core/api/models/sort-field';
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
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortProperty('date', SortDirection.Descending)]))
      .read<PaginatedResponse<Fee[]>>();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/user/fee');
  }

}
