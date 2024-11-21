import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { Author } from '@app/models/library/author';
import { Book } from '@app/models/library/book';
import { BookType } from '@app/models/library/book-type';
import { GameSystem } from '@app/models/library/game-system';
import { Language } from '@app/models/library/language';
import { Publisher } from '@app/models/library/publisher';
import { Person } from '@app/models/person/person';
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

  public getBookTypes(page: number): Observable<PaginatedResponse<BookType[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortProperty('name')]);
    query.pagination = { page };

    return this.getBookTypeClient().query(query).read();
  }

  public getGameSystems(page: number): Observable<PaginatedResponse<GameSystem[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortProperty('name')]);
    query.pagination = { page };

    return this.getGameSystemClient().query(query).read();
  }

  public getAuthors(page: number): Observable<PaginatedResponse<Author[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortProperty('name')]);
    query.pagination = { page };

    return this.getAuthorClient().query(query).read();
  }

  public getPublishers(page: number): Observable<PaginatedResponse<Publisher[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortProperty('name')]);
    query.pagination = { page };

    return this.getPublisherClient().query(query).read();
  }

  public getDonors(page: number): Observable<PaginatedResponse<Person[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortProperty('firstName'), new SortProperty('lastName'), new SortProperty('number')]);
    query.pagination = { page };

    return this.getDonorClient().query(query).read();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/library/book');
  }

  private getAuthorClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/library/author');
  }

  private getBookTypeClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/library/bookType');
  }

  private getDonorClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/person');
  }

  private getGameSystemClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/library/gameSystem');
  }

  private getPublisherClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/library/publisher');
  }

}
