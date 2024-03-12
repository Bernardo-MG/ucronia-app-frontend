import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularClient } from '@app/core/api/client/angular-client';
import { Client } from '@app/core/api/client/client';
import { PaginatedQuery } from '@app/core/api/models/paginated-query';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { SimpleResponse } from '@app/core/api/models/simple-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { GameSystem } from '../models/game-system';

@Injectable({
  providedIn: 'root'
})
export class GameSystemService {

  constructor(
    private http: HttpClient
  ) { }

  public create(data: GameSystem): Observable<GameSystem> {
    return this.getClient()
      .create<SimpleResponse<GameSystem>>(data)
      .pipe(map(r => r.content));
  }

  public getAll(page: number): Observable<PaginatedResponse<GameSystem[]>> {
    const query = new PaginatedQuery();
    query.defaultSort = new Sort([new SortField('name')]);
    query.pagination = { page };

    return this.getClient().query(query).read();
  }

  private getClient(): Client {
    return new AngularClient(this.http, environment.apiUrl + '/library/gameSystem');
  }

}
