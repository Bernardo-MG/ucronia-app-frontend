import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { PaginationParams } from '@app/core/api/models/pagination-params';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { SortingParams } from '@app/core/api/models/sorting-params';
import { Author } from '@app/models/library/author';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthorAdminService {

  constructor(
    private http: HttpClient
  ) { }

  public create(data: Author): Observable<Author> {
    return this.getClient()
      .create<SimpleResponse<Author>>(data)
      .pipe(map(r => r.content));
  }

  public update(number: number, data: Author): Observable<Author> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .update<SimpleResponse<Author>>(data)
      .pipe(map(r => r.content));
  }

  public getOne(number: number): Observable<Author> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Author>>()
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<boolean> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getAll(page: number, sort: Sort): Observable<PaginatedResponse<Author[]>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortProperty('name')]
    );

    return this.getClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/library/author');
  }

}
