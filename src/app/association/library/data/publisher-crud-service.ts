import { inject, Injectable } from '@angular/core';
import { CrudService } from '@app/shared/data/services/crud-service';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { mergeProperties, UcroniaClient } from '@ucronia/api';
import { Publisher } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class PublisherCrudService implements CrudService<Publisher> {

  private readonly ucroniaClient = inject(UcroniaClient);

  public create(data: Publisher): Observable<Publisher> {
    return this.ucroniaClient.library.publisher.create(data);
  }

  public update(data: Publisher): Observable<Publisher> {
    return this.ucroniaClient.library.publisher.update(data.number, data);
  }

  public getOne(number: number): Observable<Publisher> {
    return this.ucroniaClient.library.publisher.get(number);
  }

  public delete(number: number): Observable<Publisher> {
    return this.ucroniaClient.library.publisher.delete(number);
  }

  public getAll(page: number, sort: Sorting): Observable<Page<Publisher>> {
    const sorting = new Sorting(
      mergeProperties(
      sort.properties,
      [new SortingProperty('name'), new SortingProperty('number')]
      )
    );

    return this.ucroniaClient.library.publisher.page(page, undefined, sorting);
  }

}
