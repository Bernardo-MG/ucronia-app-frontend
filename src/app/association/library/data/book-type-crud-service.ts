import { Injectable, inject } from '@angular/core';
import { CrudService } from '@app/shared/data/services/crud-service';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { BookType } from "@ucronia/domain";
import { mergeProperties } from 'projects/ucronia/api/src/public-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class BookTypeCrudService implements CrudService<BookType> {

  private readonly ucroniaClient = inject(UcroniaClient);

  public create(data: BookType): Observable<BookType> {
    return this.ucroniaClient.library.bookType.create(data);
  }

  public update(data: BookType): Observable<BookType> {
    return this.ucroniaClient.library.bookType.update(data.number, data);
  }

  public getOne(number: number): Observable<BookType> {
    return this.ucroniaClient.library.bookType.get(number);
  }

  public delete(number: number): Observable<BookType> {
    return this.ucroniaClient.library.bookType.delete(number);
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<BookType>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [new SortingProperty('name'), new SortingProperty('number')]
      )
    );

    return this.ucroniaClient.library.bookType.page(page, undefined, sorting);
  }

}
