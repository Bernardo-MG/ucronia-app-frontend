import { Injectable, inject } from '@angular/core';
import { CrudService } from '@app/shared/data/services/crud-service';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { GameSystem } from "@ucronia/domain";
import { UcroniaClient } from 'projects/ucronia/api/src/lib/api/ucronia-client';
import { mergeProperties } from 'projects/ucronia/api/src/public-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class GameSystemCrudService implements CrudService<GameSystem> {

  private readonly ucroniaClient = inject(UcroniaClient);

  public create(data: GameSystem): Observable<GameSystem> {
    return this.ucroniaClient.library.gameSystem.create(data);
  }

  public update(data: GameSystem): Observable<GameSystem> {
    return this.ucroniaClient.library.gameSystem.update(data.number, data);
  }

  public getOne(number: number): Observable<GameSystem> {
    return this.ucroniaClient.library.gameSystem.get(number);
  }

  public delete(number: number): Observable<GameSystem> {
    return this.ucroniaClient.library.gameSystem.delete(number);
  }

  public getAll(page: number, sort: Sorting): Observable<PaginatedResponse<GameSystem>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [new SortingProperty('name'), new SortingProperty('number')]
      )
    );

    return this.ucroniaClient.library.gameSystem.page(page, undefined, sorting);
  }

}
