import { Injectable } from '@angular/core';
import { BookType } from '@app/models/library/book-type';
import { AngularCrudClientProvider, CrudClient, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class BookTypeAdminService {

  constructor(
    private clientProvider: AngularCrudClientProvider
  ) { }

  public create(data: BookType): Observable<BookType> {
    return this.getClient()
      .create<SimpleResponse<BookType>>(data)
      .pipe(map(r => r.content));
  }

  public update(number: number, data: BookType): Observable<BookType> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .update<SimpleResponse<BookType>>(data)
      .pipe(map(r => r.content));
  }

  public getOne(number: number): Observable<BookType> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .read<SimpleResponse<BookType>>()
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<boolean> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<BookType>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('name'), new SortingProperty('number')]
    );

    return this.getClient()
      .loadParameters(new PaginationParams(page))
      .loadParameters(sorting)
      .read();
  }

  private getClient(): CrudClient {
    return this.clientProvider.url(environment.apiUrl + '/library/bookType');
  }

}
