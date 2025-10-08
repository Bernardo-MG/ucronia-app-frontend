
import { Component, inject } from '@angular/core';
import { CrudNameList } from '../../../../shared/data/crud-name-list/crud-name-list';
import { GameSystemCrudService } from '../game-system-crud-service';

@Component({
  selector: 'assoc-library-game-system-list',
    imports: [CrudNameList],
  templateUrl: './library-game-system-list.html'
})
export class LibraryGameSystemList {

  protected service = inject(GameSystemCrudService);

}
