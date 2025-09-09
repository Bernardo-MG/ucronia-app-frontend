
import { Component, inject } from '@angular/core';
import { CrudNameList } from '../../../../shared/data/crud-name-list/crud-name-list';
import { GameSystemCrudService } from '../game-system-crud-service/game-system-crud-service';

@Component({
  selector: 'assoc-library-admin-game-system-list',
    imports: [CrudNameList],
  templateUrl: './library-admin-game-system-list.html'
})
export class LibraryAdminGameSystemList {

  protected service = inject(GameSystemCrudService);

}
