import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '@app/association/library/models/book';
import { Language } from '@app/association/library/models/language';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class BookAdminService {

  constructor(
    private http: HttpClient
  ) { }

  public create(data: Book): Observable<Book> {
    return this.getClient()
      .create<SimpleResponse<Book>>(data)
      .pipe(map(r => r.content));
  }

  public update(number: number, data: Book): Observable<Book> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .update<SimpleResponse<Book>>(data)
      .pipe(map(r => r.content));
  }

  public getOne(number: number): Observable<Book> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Book>>()
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<boolean> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getAll(page: number, sort: Sort): Observable<PaginatedResponse<Book[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortProperty('title')]);
    query.pagination = { page };
    query.sort = sort;

    return this.getClient().query(query).read();
  }

  public getLanguages(): Language[] {
    return [new Language('es', 'Castellano'), new Language('en', 'Inglés')];
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/library/book');
  }

}
