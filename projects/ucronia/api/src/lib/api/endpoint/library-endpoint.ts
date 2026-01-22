import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse, SimpleResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { GameBook } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { BookCreation } from '../../library/book-creation';
import { GameBookUpdate } from '../../library/game-book-update';
import { ErrorRequestInterceptor } from '../error-request-interceptor';
import { toParam } from '../sorting-param-parser';

export class LibraryEndpoint {

  private readonly gameBookEndpoint;

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) {
    this.gameBookEndpoint = new GameBookEndpoint(this.http, this.apiUrl);
  }

  public get gameBook(): GameBookEndpoint {
    return this.gameBookEndpoint;
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

  public delete(index: number): Observable<GameBook> {
    return this.http.delete<SimpleResponse<GameBook>>(`${this.apiUrl}/library/book/game/${index}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content)
      );
  }

}