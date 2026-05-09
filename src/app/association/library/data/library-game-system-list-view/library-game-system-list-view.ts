
import { Component, inject } from '@angular/core';
import { CrudNameList } from '@app/shared/data/crud-name-list/crud-name-list';
import { GameSystemCrudService } from '../game-system-crud-service';

@Component({
  selector: 'assoc-library-game-system-list-view',
    imports: [CrudNameList],
  templateUrl: './library-game-system-list-view.html'
})
export class LibraryGameSystemListView {

  protected service = inject(GameSystemCrudService);

}
