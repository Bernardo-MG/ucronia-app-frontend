import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Donor } from '../models/donor';

@Injectable({
  providedIn: 'root'
})
export class DonorAdminService {

  constructor(
    private http: HttpClient
  ) { }

  public create(data: Donor): Observable<Donor> {
    return this.getClient()
      .create<SimpleResponse<Donor>>(data)
      .pipe(map(r => r.content));
  }

  public update(name: string, data: Donor): Observable<Donor> {
    return this.getClient()
      .appendRoute(`/${name}`)
      .update<SimpleResponse<Donor>>(data)
      .pipe(map(r => r.content));
  }

  public getOne(name: string): Observable<Donor> {
    return this.getClient()
      .appendRoute(`/${name}`)
      .read<SimpleResponse<Donor>>()
      .pipe(map(r => r.content));
  }

  public delete(name: string): Observable<boolean> {
    return this.getClient()
      .appendRoute(`/${name}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getAll(page: number): Observable<PaginatedResponse<Donor[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortField('name')]);
    query.pagination = { page };

    return this.getClient().query(query).read();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/library/publisher');
  }

}
