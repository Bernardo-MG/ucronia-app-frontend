import { inject, Injectable } from '@angular/core';
import { CrudService } from '@app/shared/data/services/crud-service';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { mergeProperties, UcroniaClient } from '@ucronia/api';
import { GameSystem } from '@ucronia/domain';
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

  public getAll(page: number | undefined, sort: Sorting): Observable<Page<GameSystem>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [new SortingProperty('name'), new SortingProperty('number')]
      )
    );

    return this.ucroniaClient.library.gameSystem.page(page, undefined, sorting);
  }

}
