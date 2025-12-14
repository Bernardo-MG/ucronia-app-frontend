import { Injectable, inject } from '@angular/core';
import { CrudService } from '@app/shared/data/services/crud-service';
import { AngularCrudClientProvider, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { GameSystem } from "@ucronia/domain";
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class GameSystemCrudService implements CrudService<GameSystem> {

  private readonly client;

  constructor() {
    const clientProvider = inject(AngularCrudClientProvider);

    this.client = clientProvider.url(environment.apiUrl + '/library/gameSystem');
  }

  public create(data: GameSystem): Observable<GameSystem> {
    return this.client
      .create<SimpleResponse<GameSystem>>(data)
      .pipe(map(r => r.content));
  }

  public update(data: GameSystem): Observable<GameSystem> {
    return this.client
      .appendRoute(`/${data.number}`)
      .update<SimpleResponse<GameSystem>>(data)
      .pipe(map(r => r.content));
  }

  public getOne(number: number): Observable<GameSystem> {
    return this.client
      .appendRoute(`/${number}`)
      .read<SimpleResponse<GameSystem>>()
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<GameSystem> {
    return this.client
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<GameSystem>>()
      .pipe(map(r => r.content));
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<GameSystem>> {
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
