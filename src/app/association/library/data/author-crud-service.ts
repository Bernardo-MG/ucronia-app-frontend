import { Injectable, inject } from '@angular/core';
import { CrudService } from '@app/shared/data/services/crud-service';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { mergeProperties } from '@ucronia/api';
import { Author } from "@ucronia/domain";
import { UcroniaClient } from 'projects/ucronia/api/src/lib/api/ucronia-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthorCrudService implements CrudService<Author> {

  private readonly ucroniaClient = inject(UcroniaClient);

  public create(data: Author): Observable<Author> {
    return this.ucroniaClient.library.author.create(data);
  }

  public update(data: Author): Observable<Author> {
    return this.ucroniaClient.library.author.update(data.number, data);
  }

  public getOne(number: number): Observable<Author> {
    return this.ucroniaClient.library.author.get(number);
  }

  public delete(number: number): Observable<Author> {
    return this.ucroniaClient.library.author.delete(number);
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<Author>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [new SortingProperty('name'), new SortingProperty('number')]
      )
    );

    return this.ucroniaClient.library.author.page(page, undefined, sorting);
  }

}
