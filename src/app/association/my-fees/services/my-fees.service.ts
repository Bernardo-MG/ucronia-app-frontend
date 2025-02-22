import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fee } from '@app/models/fees/fee';
import { AngularCrudClient, CrudClient, PaginatedResponse, PaginationParams, SortingDirection, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class MyFeesService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll(page: number): Observable<PaginatedResponse<Fee>> {
    return this.getClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortingProperty('date', SortingDirection.Descending)]))
      .read<PaginatedResponse<Fee>>();
  }

  private getClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/user/fee');
  }

}
