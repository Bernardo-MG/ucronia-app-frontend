import { Injectable, inject } from '@angular/core';
import { Author } from "@ucronia/domain";
import { BookInfo } from "@ucronia/domain";
import { BookLent } from "@ucronia/domain";
import { BookReturned } from "@ucronia/domain";
import { BookType } from "@ucronia/domain";
import { BookUpdate } from "@ucronia/domain";
import { FictionBook } from "@ucronia/domain";
import { GameBook } from "@ucronia/domain";
import { GameSystem } from "@ucronia/domain";
import { Publisher } from "@ucronia/domain";
import { Member } from "@ucronia/domain";
import { MemberStatus } from "@ucronia/domain";
import { Contact } from "@ucronia/domain";
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class LibraryService {

  private readonly gameBookClient;

  private readonly fictionBookClient;

  private readonly authorClient;

  private readonly bookTypeClient;

  private readonly donorClient;

  private readonly gameSystemClient;

  private readonly publisherClient;

  private readonly lendingClient;

  private readonly memberClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.gameBookClient = clientProvider.url(environment.apiUrl + '/library/book/game');
    this.fictionBookClient = clientProvider.url(environment.apiUrl + '/library/book/fiction');
    this.authorClient = clientProvider.url(environment.apiUrl + '/library/author');
    this.bookTypeClient = clientProvider.url(environment.apiUrl + '/library/bookType');
    this.donorClient = clientProvider.url(environment.apiUrl + '/contact');
    this.gameSystemClient = clientProvider.url(environment.apiUrl + '/library/gameSystem');
    this.publisherClient = clientProvider.url(environment.apiUrl + '/library/publisher');
    this.lendingClient = clientProvider.url(environment.apiUrl + '/library/lending');
    this.memberClient = clientProvider.url(environment.apiUrl + '/contact');
  }

  public createGameBook(data: BookInfo): Observable<BookInfo> {
    return this.gameBookClient
      .create<SimpleResponse<BookInfo>>(data)
      .pipe(map(r => r.content));
  }

  public updateGameBookNew(data: BookUpdate): Observable<GameBook> {
    return this.gameBookClient
      .appendRoute(`/${data.number}`)
      .update<SimpleResponse<GameBook>>(data)
      .pipe(map(r => r.content));
  }

  public updateGameBook(data: BookUpdate): Observable<GameBook> {
    return this.gameBookClient
      .appendRoute(`/${data.number}`)
      .update<SimpleResponse<GameBook>>(data)
      .pipe(map(r => r.content));
  }

  public getOneGameBook(number: number): Observable<GameBook> {
    return this.gameBookClient
      .appendRoute(`/${number}`)
      .read<SimpleResponse<GameBook>>()
      .pipe(map(r => r.content));
  }

  public deleteGameBook(number: number): Observable<GameBook> {
    return this.gameBookClient
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<GameBook>>()
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

  public createFictionBook(data: BookInfo): Observable<FictionBook> {
    return this.fictionBookClient
      .create<SimpleResponse<FictionBook>>(data)
      .pipe(map(r => r.content));
  }

  public updateFictionBook(data: BookUpdate): Observable<FictionBook> {
    return this.fictionBookClient
      .appendRoute(`/${data.number}`)
      .update<SimpleResponse<GameBook>>(data)
      .pipe(map(r => r.content));
  }

  public getOneFictionBook(number: number): Observable<FictionBook> {
    return this.fictionBookClient
      .appendRoute(`/${number}`)
      .read<SimpleResponse<GameBook>>()
      .pipe(map(r => r.content));
  }

  public deleteFictionBook(number: number): Observable<FictionBook> {
    return this.fictionBookClient
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<FictionBook>>()
      .pipe(map(r => r.content));
  }

  public getAllFictionBooks(page: number, sort: Sorting): Observable<PaginatedResponse<FictionBook>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('title'), new SortingProperty('supertitle'), new SortingProperty('subtitle'), new SortingProperty('number')]
    );

    return this.fictionBookClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
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

  public getDonors(page: number): Observable<PaginatedResponse<Contact>> {
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

  public getMembers(page: number, active: MemberStatus): Observable<PaginatedResponse<Member>> {
    return this.memberClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(new SortingParams([new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]))
      .parameter('status', active.toString().toUpperCase())
      .read<PaginatedResponse<Member>>();
  }

}
