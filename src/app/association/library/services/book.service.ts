import { Injectable, inject } from '@angular/core';
import { FictionBook } from '@app/models/library/fiction-book';
import { GameBook } from '@app/models/library/game-book';
import { Language } from '@app/models/library/language';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class BookService {

  private readonly gameClient;

  private readonly fictionClient;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.gameClient = clientProvider.url(environment.apiUrl + '/library/book/game');
    this.fictionClient = clientProvider.url(environment.apiUrl + '/library/book/fiction');
  }

  public getOneGameBook(number: number): Observable<GameBook> {
    return this.gameClient
      .appendRoute(`/${number}`)
      .read<SimpleResponse<GameBook>>()
      .pipe(map(r => r.content));
  }

  public getAllGameBooks(page: number, sort: Sorting): Observable<PaginatedResponse<GameBook>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('title')]
    );

    return this.gameClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  public getOneFictionBook(number: number): Observable<FictionBook> {
    return this.fictionClient
      .appendRoute(`/${number}`)
      .read<SimpleResponse<GameBook>>()
      .pipe(map(r => r.content));
  }

  public getAllFictionBooks(page: number, sort: Sorting): Observable<PaginatedResponse<FictionBook>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('title')]
    );

    return this.fictionClient
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  public getLanguages(): Language[] {
    return [new Language('es', 'Castellano'), new Language('en', 'Inglés')];
  }

}
