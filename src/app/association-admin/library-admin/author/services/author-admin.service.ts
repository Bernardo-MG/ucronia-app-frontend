import { Injectable } from '@angular/core';
import { Author } from '@app/models/library/author';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthorAdminService {

  private readonly client;

  constructor(
    clientProvider: AngularCrudClientProvider
  ) {
    this.client = clientProvider.url(environment.apiUrl + '/library/author');
  }

  public create(data: Author): Observable<Author> {
    return this.client
      .create<SimpleResponse<Author>>(data)
      .pipe(map(r => r.content));
  }

  public update(number: number, data: Author): Observable<Author> {
    return this.client
      .appendRoute(`/${number}`)
      .update<SimpleResponse<Author>>(data)
      .pipe(map(r => r.content));
  }

  public getOne(number: number): Observable<Author> {
    return this.client
      .appendRoute(`/${number}`)
      .read<SimpleResponse<Author>>()
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<boolean> {
    return this.client
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<Author>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('name'), new SortingProperty('number')]
    );

    return this.client
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

}
