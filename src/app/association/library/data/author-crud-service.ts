import { inject, Injectable } from '@angular/core';
import { CrudService } from '@app/shared/data/services/crud-service';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { mergeProperties, UcroniaClient } from '@ucronia/api';
import { Author } from '@ucronia/domain';
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

  public getAll(page: number | undefined, sort: Sorting): Observable<Page<Author>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [new SortingProperty('name'), new SortingProperty('number')]
      )
    );

    return this.ucroniaClient.library.author.page(page, undefined, sorting);
  }

}
