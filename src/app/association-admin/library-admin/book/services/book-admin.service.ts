import { Injectable } from '@angular/core';
import { Author } from '@app/models/library/author';
import { BookLent } from '@app/models/library/book-lent';
import { BookReturned } from '@app/models/library/book-returned';
import { BookType } from '@app/models/library/book-type';
import { GameBook } from '@app/models/library/game-book';
import { GameSystem } from '@app/models/library/game-system';
import { Language } from '@app/models/library/language';
import { Publisher } from '@app/models/library/publisher';
import { Member } from '@app/models/members/member';
import { Active } from '@app/models/person/active';
import { Person } from '@app/models/person/person';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { BookInfo } from '../../../../models/library/book-info';

@Injectable({
  providedIn: "root"
})
export class GameAdminService {

  private readonly gameBookClient;

  private readonly fictionBookClient;

  private readonly authorClient;

  private readonly bookTypeClient;

  private readonly donorClient;

  private readonly gameSystemClient;

  private readonly publisherClient;

  private readonly lendingClient;

  private readonly memberClient;

  constructor(
    clientProvider: AngularCrudClientProvider
  ) {
    this.gameBookClient = clientProvider.url(environment.apiUrl + '/library/book/game');
    this.fictionBookClient = clientProvider.url(environment.apiUrl + '/library/book/fiction');
    this.authorClient = clientProvider.url(environment.apiUrl + '/library/author');
    this.bookTypeClient = clientProvider.url(environment.apiUrl + '/library/bookType');
    this.donorClient = clientProvider.url(environment.apiUrl + '/person');
    this.gameSystemClient = clientProvider.url(environment.apiUrl + '/library/gameSystem');
    this.publisherClient = clientProvider.url(environment.apiUrl + '/library/publisher');
    this.lendingClient = clientProvider.url(environment.apiUrl + '/library/lending');
    this.memberClient = clientProvider.url(environment.apiUrl + '/person');
  }

  public createGame(data: BookInfo): Observable<BookInfo> {
    return this.gameBookClient
      .create<SimpleResponse<BookInfo>>(data)
      .pipe(map(r => r.content));
  }

  public updateGame(number: number, data: GameBook): Observable<GameBook> {
    return this.gameBookClient
      .appendRoute(`/${number}`)
      .update<SimpleResponse<GameBook>>(data)
      .pipe(map(r => r.content));
  }

  public getOneGame(number: number): Observable<GameBook> {
    return this.gameBookClient
      .appendRoute(`/${number}`)
      .read<SimpleResponse<GameBook>>()
      .pipe(map(r => r.content));
  }

  public deleteGame(number: number): Observable<boolean> {
    return this.gameBookClient
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getAllGameBooks(page: number, sort: Sorting): Observable<PaginatedResponse<GameBook>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('title'), new SortingProperty('supertitle'), new SortingProperty('subtitle'), new SortingProperty('number')]
    );

    return this.gameBookClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  public getAllFictionBooks(page: number, sort: Sorting): Observable<PaginatedResponse<GameBook>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('title'), new SortingProperty('supertitle'), new SortingProperty('subtitle'), new SortingProperty('number')]
    );

    return this.fictionBookClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  public getLanguages(): Language[] {
    return [new Language('es', 'Castellano'), new Language('en', 'Inglés')];
  }

  public getBookTypes(page: number): Observable<PaginatedResponse<BookType>> {
    const sorting = new SortingParams(
      [new SortingProperty('name')]
    );

    return this.bookTypeClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  public getGameSystems(page: number): Observable<PaginatedResponse<GameSystem>> {
    const sorting = new SortingParams(
      [new SortingProperty('name')]
    );

    return this.gameSystemClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
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
