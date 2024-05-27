import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { BookType } from '../models/book-type';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';

@Injectable({
  providedIn: "root"
})
export class BookTypeAdminService {

  constructor(
    private http: HttpClient
  ) { }

  public create(data: BookType): Observable<BookType> {
    return this.getClient()
      .create<SimpleResponse<BookType>>(data)
      .pipe(map(r => r.content));
  }

  public update(name: string, data: BookType): Observable<BookType> {
    return this.getClient()
      .appendRoute(`/${name}`)
      .update<SimpleResponse<BookType>>(data)
      .pipe(map(r => r.content));
  }

  public getOne(name: string): Observable<BookType> {
    return this.getClient()
      .appendRoute(`/${name}`)
      .read<SimpleResponse<BookType>>()
      .pipe(map(r => r.content));
  }

  public delete(name: string): Observable<boolean> {
    return this.getClient()
      .appendRoute(`/${name}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getAll(page: number): Observable<PaginatedResponse<BookType[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortProperty('name')]);
    query.pagination = { page };

    return this.getClient().query(query).read();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/library/bookType');
  }

}
