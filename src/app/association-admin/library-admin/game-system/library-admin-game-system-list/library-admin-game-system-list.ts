
import { Component, inject } from '@angular/core';
import { LibraryCrudNameList } from '../../common/library-crud-name-list/library-crud-name-list';
import { GameSystemCrudService } from '../game-system-crud-service/game-system-crud-service';

@Component({
  selector: 'assoc-library-admin-game-system-list',
    imports: [LibraryCrudNameList],
  templateUrl: './library-admin-game-system-list.html'
})
export class LibraryAdminGameSystemList {

  protected service = inject(GameSystemCrudService);

}
