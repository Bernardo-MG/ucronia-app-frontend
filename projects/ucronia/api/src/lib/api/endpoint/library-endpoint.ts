import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse, SimpleResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { Author, BookType, FictionBook, GameBook, GameSystem, Publisher } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { BookCreation } from '../../library/book-creation';
import { BookTypeUpdate } from '../../library/book-type-update';
import { FictionBookUpdate } from '../../library/fiction-book-update';
import { GameBookUpdate } from '../../library/game-book-update';
import { GameSystemUpdate } from '../../library/game-system-update';
import { ErrorRequestInterceptor } from '../error-request-interceptor';
import { toParam } from '../sorting-param-parser';
import { AuthorUpdate } from '../../library/author-update';
import { PublisherUpdate } from '../../library/publisher-update';

export class LibraryEndpoint {

  private readonly gameBookEndpoint;
  private readonly fictionBookEndpoint;
  private readonly bookTypeEndpoint;
  private readonly gameSystemEndpoint;
  private readonly authorEndpoint;
  private readonly publisherEndpoint;

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) {
    this.gameBookEndpoint = new GameBookEndpoint(this.http, this.apiUrl);
    this.fictionBookEndpoint = new FictionBookEndpoint(this.http, this.apiUrl);
    this.bookTypeEndpoint = new BookTypeEndpoint(this.http, this.apiUrl);
    this.gameSystemEndpoint = new GameSystemEndpoint(this.http, this.apiUrl);
    this.authorEndpoint = new AuthorEndpoint(this.http, this.apiUrl);
    this.publisherEndpoint = new PublisherEndpoint(this.http, this.apiUrl);
  }

  public get gameBook(): GameBookEndpoint {
    return this.gameBookEndpoint;
  }

  public get fictionBook(): FictionBookEndpoint {
    return this.fictionBookEndpoint;
  }

  public get bookType(): BookTypeEndpoint {
    return this.bookTypeEndpoint;
  }

  public get gameSystem(): GameSystemEndpoint {
    return this.gameSystemEndpoint;
  }

  public get author(): AuthorEndpoint {
    return this.authorEndpoint;
  }

  public get publisher(): PublisherEndpoint {  
    return this.publisherEndpoint;
  }

}

export class GameBookEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined,
    size: number | undefined = undefined,
    sort: Sorting
  ): Observable<PaginatedResponse<GameBook>> {
    const defaultProperties = [new SortingProperty('title'), new SortingProperty('supertitle'), new SortingProperty('subtitle'), new SortingProperty('number')];

    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    toParam(sort.properties, defaultProperties)
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<PaginatedResponse<GameBook>>(`${this.apiUrl}/library/book/game`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(number: number): Observable<GameBook> {
    return this.http.get<SimpleResponse<GameBook>>(`${this.apiUrl}/library/book/game/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public create(data: BookCreation): Observable<GameBook> {
    return this.http.post<SimpleResponse<GameBook>>(`${this.apiUrl}/library/book/game`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(number: number, data: GameBookUpdate): Observable<GameBook> {
    return this.http.put<SimpleResponse<GameBook>>(`${this.apiUrl}/library/book/game/${number}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(number: number): Observable<GameBook> {
    return this.http.delete<SimpleResponse<GameBook>>(`${this.apiUrl}/library/book/game/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}

export class FictionBookEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined,
    size: number | undefined = undefined,
    sort: Sorting
  ): Observable<PaginatedResponse<FictionBook>> {
    const defaultProperties = [new SortingProperty('title'), new SortingProperty('supertitle'), new SortingProperty('subtitle'), new SortingProperty('number')];

    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    toParam(sort.properties, defaultProperties)
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<PaginatedResponse<FictionBook>>(`${this.apiUrl}/library/book/fiction`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(number: number): Observable<FictionBook> {
    return this.http.get<SimpleResponse<FictionBook>>(`${this.apiUrl}/library/book/fiction/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public create(data: BookCreation): Observable<FictionBook> {
    return this.http.post<SimpleResponse<FictionBook>>(`${this.apiUrl}/library/book/fiction`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(number: number, data: FictionBookUpdate): Observable<FictionBook> {
    return this.http.put<SimpleResponse<FictionBook>>(`${this.apiUrl}/library/book/fiction/${number}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(number: number): Observable<FictionBook> {
    return this.http.delete<SimpleResponse<FictionBook>>(`${this.apiUrl}/library/book/fiction/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}

export class BookTypeEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined,
    size: number | undefined = undefined,
    sort: Sorting
  ): Observable<PaginatedResponse<BookType>> {

    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<PaginatedResponse<BookType>>(`${this.apiUrl}/library/bookType`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(number: number): Observable<BookType> {
    return this.http.get<SimpleResponse<BookType>>(`${this.apiUrl}/library/bookType/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public create(data: BookCreation): Observable<BookType> {
    return this.http.post<SimpleResponse<BookType>>(`${this.apiUrl}/library/bookType`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(number: number, data: BookTypeUpdate): Observable<BookType> {
    return this.http.put<SimpleResponse<BookType>>(`${this.apiUrl}/library/bookType/${number}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(number: number): Observable<BookType> {
    return this.http.delete<SimpleResponse<BookType>>(`${this.apiUrl}/library/bookType/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}

export class GameSystemEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined,
    size: number | undefined = undefined,
    sort: Sorting
  ): Observable<PaginatedResponse<GameSystem>> {

    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<PaginatedResponse<GameSystem>>(`${this.apiUrl}/library/gameSystem`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(number: number): Observable<GameSystem> {
    return this.http.get<SimpleResponse<GameSystem>>(`${this.apiUrl}/library/gameSystem/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public create(data: BookCreation): Observable<GameSystem> {
    return this.http.post<SimpleResponse<GameSystem>>(`${this.apiUrl}/library/gameSystem`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(number: number, data: GameSystemUpdate): Observable<GameSystem> {
    return this.http.put<SimpleResponse<GameSystem>>(`${this.apiUrl}/library/gameSystem/${number}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(number: number): Observable<GameSystem> {
    return this.http.delete<SimpleResponse<GameSystem>>(`${this.apiUrl}/library/gameSystem/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}

export class AuthorEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined,
    size: number | undefined = undefined,
    sort: Sorting
  ): Observable<PaginatedResponse<Author>> {

    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<PaginatedResponse<Author>>(`${this.apiUrl}/library/author`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(number: number): Observable<Author> {
    return this.http.get<SimpleResponse<Author>>(`${this.apiUrl}/library/author/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public create(data: BookCreation): Observable<Author> {
    return this.http.post<SimpleResponse<Author>>(`${this.apiUrl}/library/author`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(number: number, data: AuthorUpdate): Observable<Author> {
    return this.http.put<SimpleResponse<Author>>(`${this.apiUrl}/library/author/${number}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(number: number): Observable<Author> {
    return this.http.delete<SimpleResponse<Author>>(`${this.apiUrl}/library/author/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}

export class PublisherEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public page(
    page: number | undefined,
    size: number | undefined = undefined,
    sort: Sorting
  ): Observable<PaginatedResponse<Publisher>> {

    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<PaginatedResponse<Publisher>>(`${this.apiUrl}/library/author`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  public get(number: number): Observable<Publisher> {
    return this.http.get<SimpleResponse<Publisher>>(`${this.apiUrl}/library/author/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public create(data: BookCreation): Observable<Publisher> {
    return this.http.post<SimpleResponse<Publisher>>(`${this.apiUrl}/library/author`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public update(number: number, data: PublisherUpdate): Observable<Publisher> {
    return this.http.put<SimpleResponse<Publisher>>(`${this.apiUrl}/library/author/${number}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

  public delete(number: number): Observable<Publisher> {
    return this.http.delete<SimpleResponse<Publisher>>(`${this.apiUrl}/library/author/${number}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}
