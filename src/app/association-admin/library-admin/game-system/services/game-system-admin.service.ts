import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { GameSystem } from '@app/models/library/game-system';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class GameSystemAdminService {

  constructor(
    private http: HttpClient
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

  public getAll(page: number, sort?: Sort): Observable<PaginatedResponse<GameSystem[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortProperty('name')]);
    query.pagination = { page };
    if (sort) {
      query.sort = sort;
    }

    return this.getClient().query(query).read();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/library/gameSystem');
  }

}
