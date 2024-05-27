import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { Publisher } from '../models/publisher';

@Injectable({
  providedIn: "root"
})
export class PublisherAdminService {

  constructor(
    private http: HttpClient
  ) { }

  public create(data: Publisher): Observable<Publisher> {
    return this.getClient()
      .create<SimpleResponse<Publisher>>(data)
      .pipe(map(r => r.content));
  }

  public update(name: string, data: Publisher): Observable<Publisher> {
    return this.getClient()
      .appendRoute(`/${name}`)
      .update<SimpleResponse<Publisher>>(data)
      .pipe(map(r => r.content));
  }

  public getOne(name: string): Observable<Publisher> {
    return this.getClient()
      .appendRoute(`/${name}`)
      .read<SimpleResponse<Publisher>>()
      .pipe(map(r => r.content));
  }

  public delete(name: string): Observable<boolean> {
    return this.getClient()
      .appendRoute(`/${name}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getAll(page: number): Observable<PaginatedResponse<Publisher[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortProperty('name')]);
    query.pagination = { page };

    return this.getClient().query(query).read();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/library/publisher');
  }

}
