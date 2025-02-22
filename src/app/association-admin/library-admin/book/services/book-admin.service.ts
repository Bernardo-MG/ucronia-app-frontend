import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '@app/models/library/author';
import { Book } from '@app/models/library/book';
import { BookType } from '@app/models/library/book-type';
import { GameSystem } from '@app/models/library/game-system';
import { Language } from '@app/models/library/language';
import { Publisher } from '@app/models/library/publisher';
import { Person } from '@app/models/person/person';
import { AngularCrudClient, CrudClient, PaginatedResponse, PaginationParams, SimpleResponse, Sort, SortProperty, SortingParams } from '@bernardo-mg/request';
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
    const sorting = new SortingParams(
      sort.properties,
      [new SortProperty('title'), new SortProperty('supertitle'), new SortProperty('subtitle'), new SortProperty('number')]
    );

    return this.getClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  public getLanguages(): Language[] {
    return [new Language('es', 'Castellano'), new Language('en', 'Inglés')];
  }

  public getBookTypes(page: number): Observable<PaginatedResponse<BookType[]>> {
    const sorting = new SortingParams(
      [new SortProperty('name')]
    );

    return this.getBookTypeClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  public getGameSystems(page: number): Observable<PaginatedResponse<GameSystem[]>> {
    const sorting = new SortingParams(
      [new SortProperty('name')]
    );

    return this.getGameSystemClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  public getAuthors(page: number): Observable<PaginatedResponse<Author[]>> {
    const sorting = new SortingParams(
      [new SortProperty('name')]
    );

    return this.getAuthorClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  public getPublishers(page: number): Observable<PaginatedResponse<Publisher[]>> {
    const sorting = new SortingParams(
      [new SortProperty('name')]
    );

    return this.getPublisherClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  public getDonors(page: number): Observable<PaginatedResponse<Person[]>> {
    return this.getDonorClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortProperty('firstName'), new SortProperty('lastName'), new SortProperty('number')]))
      .read();
  }

  private getClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/library/book');
  }

  private getAuthorClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/library/author');
  }

  private getBookTypeClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/library/bookType');
  }

  private getDonorClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/person');
  }

  private getGameSystemClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/library/gameSystem');
  }

  private getPublisherClient(): CrudClient {
    return new AngularCrudClient(this.http, environment.apiUrl + '/library/publisher');
  }

}
