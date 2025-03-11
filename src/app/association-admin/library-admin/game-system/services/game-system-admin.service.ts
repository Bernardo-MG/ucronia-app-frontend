import { Injectable } from '@angular/core';
import { GameSystem } from '@app/models/library/game-system';
import { AngularCrudClientProvider, CrudClient, PaginatedResponse, PaginationParams, SimpleResponse, Sorting, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class GameSystemAdminService {

  constructor(
    private clientProvider: AngularCrudClientProvider
  ) { }

  public create(data: GameSystem): Observable<GameSystem> {
    return this.getClient()
      .create<SimpleResponse<GameSystem>>(data)
      .pipe(map(r => r.content));
  }

  public update(number: number, data: GameSystem): Observable<GameSystem> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .update<SimpleResponse<GameSystem>>(data)
      .pipe(map(r => r.content));
  }

  public getOne(number: number): Observable<GameSystem> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .read<SimpleResponse<GameSystem>>()
      .pipe(map(r => r.content));
  }

  public delete(number: number): Observable<boolean> {
    return this.getClient()
      .appendRoute(`/${number}`)
      .delete<SimpleResponse<boolean>>()
      .pipe(map(r => r.content));
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<GameSystem>> {
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
    return this.clientProvider.url(environment.apiUrl + '/library/gameSystem');
  }

}
