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
import { Book } from '../models/book';

@Injectable()
export class BookService {

  constructor(
    private http: HttpClient
  ) { }

  public getOne(number: number): Observable<Book> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Book>>()
      .pipe(map(r => r.content));
  }

  public getAll(page: number): Observable<PaginatedResponse<Book[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortField('title')]);
    query.pagination = { page };

    return this.getClient().query(query).read();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/library/book');
  }

}
