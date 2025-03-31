import { Injectable } from '@angular/core';
import { Author } from '@app/models/library/author';
import { BookInfo } from '@app/models/library/book-info';
import { BookLent } from '@app/models/library/book-lent';
import { BookReturned } from '@app/models/library/book-returned';
import { FictionBook } from '@app/models/library/fiction-book';
import { Language } from '@app/models/library/language';
import { Publisher } from '@app/models/library/publisher';
import { Member } from '@app/models/members/member';
import { Active } from '@app/models/person/active';
import { Person } from '@app/models/person/person';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FictionBookAdminService {

  private readonly bookClient;

  private readonly authorClient;

  private readonly donorClient;

  private readonly publisherClient;

  private readonly lendingClient;

  private readonly memberClient;

  constructor(
    clientProvider: AngularCrudClientProvider
  ) {
    this.bookClient = clientProvider.url(environment.apiUrl + '/library/book/fiction');
    this.authorClient = clientProvider.url(environment.apiUrl + '/library/author');
    this.donorClient = clientProvider.url(environment.apiUrl + '/person');
    this.publisherClient = clientProvider.url(environment.apiUrl + '/library/publisher');
    this.lendingClient = clientProvider.url(environment.apiUrl + '/library/lending');
    this.memberClient = clientProvider.url(environment.apiUrl + '/person');
  }

  public create(data: BookInfo): Observable<FictionBook> {
    return this.bookClient
      .create<SimpleResponse<FictionBook>>(data)
      .pipe(map(r => r.content));
  }

  public update(number: number, data: FictionBook): Observable<FictionBook> {
    return this.bookClient
      .appendRoute(`/${number}`)
      .update<SimpleResponse<FictionBook>>(data)
      .pipe(map(r => r.content));
  }

  public getOne(number: number): Observable<FictionBook> {
    return this.bookClient
      .appendRoute(`/${number}`)
      .read<SimpleResponse<FictionBook>>()
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<boolean> {
    return this.bookClient
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<FictionBook>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('title'), new SortingProperty('supertitle'), new SortingProperty('subtitle'), new SortingProperty('number')]
    );

    return this.bookClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  public getLanguages(): Language[] {
    return [new Language('es', 'Castellano'), new Language('en', 'Inglés')];
  }

  public getAuthors(page: number): Observable<PaginatedResponse<Author>> {
    const sorting = new SortingParams(
      [new SortingProperty('name')]
    );

    return this.authorClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  public getPublishers(page: number): Observable<PaginatedResponse<Publisher>> {
    const sorting = new SortingParams(
      [new SortingProperty('name')]
    );

    return this.publisherClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  public getDonors(page: number): Observable<PaginatedResponse<Person>> {
    return this.donorClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]))
      .read();
  }

  public lend(data: BookLent): Observable<BookLent> {
    return this.lendingClient
      .create<SimpleResponse<BookLent>>(data)
      .pipe(map(r => r.content));
  }

  public return(data: BookReturned): Observable<BookReturned> {
    return this.lendingClient
      .update<SimpleResponse<BookReturned>>(data)
      .pipe(map(r => r.content));
  }

  public getMembers(page: number, active: Active): Observable<PaginatedResponse<Member>> {
    return this.memberClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]))
      .parameter('status', active.toString().toUpperCase())
      .read<PaginatedResponse<Member>>();
  }

}
