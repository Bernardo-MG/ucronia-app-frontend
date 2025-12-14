import { Injectable, inject } from '@angular/core';
import { CrudService } from '@app/shared/data/services/crud-service';
import { BookType } from "@ucronia/domain";
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class BookTypeCrudService implements CrudService<BookType> {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/library/bookType');
  }

  public create(data: BookType): Observable<BookType> {
    return this.client
      .create<SimpleResponse<BookType>>(data)
      .pipe(map(r => r.content));
  }

  public update(data: BookType): Observable<BookType> {
    return this.client
      .appendRoute(`/${data.number}`)
      .update<SimpleResponse<BookType>>(data)
      .pipe(map(r => r.content));
  }

  public getOne(number: number): Observable<BookType> {
    return this.client
      .appendRoute(`/${number}`)
      .read<SimpleResponse<BookType>>()
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<BookType> {
    return this.client
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<BookType>>()
      .pipe(map(r => r.content));
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<BookType>> {
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
