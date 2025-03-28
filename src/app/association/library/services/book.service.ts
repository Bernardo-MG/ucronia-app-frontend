import { Injectable } from '@angular/core';
import { GameBook } from '@app/models/library/game-book';
import { Language } from '@app/models/library/language';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class BookService {

  private readonly client;

  constructor(
    clientProvider: AngularCrudClientProvider
  ) {
    this.client = clientProvider.url(environment.apiUrl + '/library/book');
  }

  public getOne(number: number): Observable<GameBook> {
    return this.client
      .appendRoute(`/${number}`)
      .read<SimpleResponse<GameBook>>()
      .pipe(map(r => r.content));
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<GameBook>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('title')]
    );

    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  public getLanguages(): Language[] {
    return [new Language('es', 'Castellano'), new Language('en', 'Inglés')];
  }

}
